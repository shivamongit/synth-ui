import re

from app.config import settings

SYSTEM_PROMPT = """You are an expert UI developer. Generate production-ready component code based on the user's description.

Rules:
- Output ONLY the component code, no explanations or markdown
- Use proper TypeScript types when the framework is React/Vue
- Follow best practices for the chosen framework and styling
- Make components accessible (aria labels, semantic HTML)
- Include all necessary imports at the top
- Use modern patterns (hooks, composition API, etc.)
- Make the component responsive by default
"""


def _build_user_prompt(prompt: str, framework: str, styling: str) -> str:
    fw_map = {
        "react": "React 18 with TypeScript",
        "vue": "Vue 3 with TypeScript and Composition API",
        "svelte": "Svelte 4",
        "html": "plain HTML5",
    }
    style_map = {
        "tailwind": "Tailwind CSS utility classes",
        "css-modules": "CSS Modules",
        "styled-components": "styled-components",
        "vanilla": "vanilla CSS with a <style> block",
    }

    return (
        f"Generate a {fw_map.get(framework, 'React')} component using {style_map.get(styling, 'Tailwind CSS')}.\n\n"
        f"Description: {prompt}\n\n"
        f"Output only the complete component code, ready to use in a project."
    )


def _extract_code(text: str) -> str:
    code_block = re.search(r"```(?:\w+)?\n(.*?)```", text, re.DOTALL)
    if code_block:
        return code_block.group(1).strip()
    return text.strip()


async def generate_component_code(
    prompt: str,
    framework: str,
    styling: str,
    provider: str,
    temperature: float = 0.7,
    max_tokens: int = 4096,
) -> dict:
    user_prompt = _build_user_prompt(prompt, framework, styling)

    if provider == "openai":
        return await _generate_openai(user_prompt, temperature, max_tokens)
    elif provider == "anthropic":
        return await _generate_anthropic(user_prompt, temperature, max_tokens)
    else:
        raise ValueError(f"Unknown provider: {provider}")


async def _generate_openai(user_prompt: str, temperature: float, max_tokens: int) -> dict:
    from openai import AsyncOpenAI

    client = AsyncOpenAI(api_key=settings.openai_api_key)

    response = await client.chat.completions.create(
        model=settings.default_model_openai,
        messages=[
            {"role": "system", "content": SYSTEM_PROMPT},
            {"role": "user", "content": user_prompt},
        ],
        temperature=temperature,
        max_tokens=max_tokens,
    )

    content = response.choices[0].message.content or ""
    tokens_used = response.usage.total_tokens if response.usage else 0

    return {"code": _extract_code(content), "tokens_used": tokens_used}


async def _generate_anthropic(user_prompt: str, temperature: float, max_tokens: int) -> dict:
    from anthropic import AsyncAnthropic

    client = AsyncAnthropic(api_key=settings.anthropic_api_key)

    response = await client.messages.create(
        model=settings.default_model_anthropic,
        system=SYSTEM_PROMPT,
        messages=[{"role": "user", "content": user_prompt}],
        temperature=temperature,
        max_tokens=max_tokens,
    )

    content = response.content[0].text if response.content else ""
    tokens_used = (response.usage.input_tokens + response.usage.output_tokens) if response.usage else 0

    return {"code": _extract_code(content), "tokens_used": tokens_used}
