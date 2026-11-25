---
name: creating-documentation-notes
description: Create concise, well-structured Markdown study notes from a documentation page the user provides. Use when asked to summarize a technical guide into key points or create/update a documentation notes file.
---

# Creating Documentation Notes

Turn the documentation source supplied by the user into useful, concise notes in the requested Markdown file. Treat this as a source-grounded study aid, not a verbatim copy or a broad tutorial.

## Workflow

1. Identify the source URL and the exact target Markdown file from the request or IDE context. If either is unclear and cannot be reliably inferred, ask before editing.
2. Read the source page. For technical documentation, check relevant local project guidance and documentation too when available; follow any repository-specific instructions about version-specific APIs.
3. If the target already contains notes, read and preserve its useful content. If there are related notes in the same folder, use them as a style reference.
4. Distill the source into the concepts, rules, examples, and caveats most useful to someone learning the topic. Prefer the source's current guidance over prior assumptions.
5. Write directly to the requested file. Keep the scope to that file unless the user asks for other changes.
6. Re-read the result to ensure it is saved, coherent, and accurately reflects the source.

## Note style

- Start with a clear title and a blockquote linking to the source.
- For a longer page, add a Table of Contents with working heading anchors.
- Organize material into descriptive headings and subheadings that follow the source's concepts.
- Use concise explanations, bullets, and tables where they make comparisons or conventions easier to scan.
- Use fenced code blocks for short, relevant examples; label the language and show a useful file path when appropriate.
- Explain important behavior and version-specific caveats in plain language. Keep details that change how a feature is used; omit repetition and incidental prose.
- Use consistent spelling, grammar, Markdown formatting, and terminology.
- Link to authoritative related references when they add useful context. Do not invent facts or links.

## Accuracy and scope

- Base notes on the provided source and relevant repository documentation; do not rely on memory when the documentation can be checked.
- Paraphrase rather than reproduce long passages or copy the source wholesale.
- Keep examples minimal and internally consistent with the described behavior and project version.
- Do not add unrelated advice, undocumented claims, or speculative behavior.
- Do not silently omit a major topic from the source if it is central to the requested notes; summarize it proportionally.
- Do not run tests or builds for documentation-only changes unless the repository provides a relevant Markdown validation command.

## Completion

After editing, verify the requested file contains the notes and report the file changed. Briefly summarize the main sections covered and mention any validation performed or not needed.
