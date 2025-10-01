-- Convert Obsidian-style math callouts (e.g. > [!theorem|1.2] Title)
-- into Quarto theorem blocks with original styling.

local alias_map = {
  definition = "definition",
  def = "definition",
  theorem = "theorem",
  thm = "theorem",
  lemma = "lemma",
  proposition = "proposition",
  prop = "proposition",
  corollary = "corollary",
  cor = "corollary",
  remark = "remark",
  rmq = "remark",
  note = "note",
  example = "example",
  ex = "example",
  proof = "proof",
  warning = "warning",
  caution = "caution",
  assumption = "assumption",
  claim = "claim"
}

local display_map = {
  definition = "Definition",
  theorem = "Theorem",
  lemma = "Lemma",
  proposition = "Proposition",
  corollary = "Corollary",
  remark = "Remark",
  note = "Note",
  example = "Example",
  proof = "Proof",
  warning = "Warning",
  caution = "Caution",
  assumption = "Assumption",
  claim = "Claim"
}

local function trim(s)
  return (s or ""):gsub("^%s+", ""):gsub("%s+$", "")
end

local function parse_inlines(str)
  if not str or trim(str) == "" then
    return pandoc.List()
  end
  local doc = pandoc.read(str, "markdown")
  if #doc.blocks > 0 and doc.blocks[1].t == "Para" then
    return doc.blocks[1].content
  end
  return pandoc.List({ pandoc.Str(trim(str)) })
end

local function resolve_type(t)
  if not t then return "note" end
  t = t:lower():gsub("%s+", "-")
  return alias_map[t] or t
end

local function capitalise(word)
  if not word or word == "" then return "" end
  return word:sub(1,1):upper() .. word:sub(2)
end

local function callout_from_blockquote(block)
  if block.t ~= "BlockQuote" or #block.content == 0 then
    return nil
  end

  local first_para = block.content[1]
  if first_para.t ~= "Para" or #first_para.content == 0 then
    return nil
  end

  local first_inline = first_para.content[1]
  if first_inline.t ~= "Str" then
    return nil
  end

  local marker_text = first_inline.text
  local ctype, label = marker_text:match("^%[!([%w%-]+)%|([^%]]-)%]")
  if not ctype then
    ctype = marker_text:match("^%[!([%w%-]+)%]")
  end
  if not ctype then
    return nil
  end

  local callout_type = resolve_type(ctype)
  local display = display_map[callout_type] or capitalise(callout_type)
  label = label and trim(label) or nil
  if label == "" or label == "*" then
    label = nil
  end

  -- remove marker inline and optional following space
  table.remove(first_para.content, 1)
  if #first_para.content > 0 and first_para.content[1].t == "Space" then
    table.remove(first_para.content, 1)
  end

  local title_inlines = pandoc.List()
  local body_lead = pandoc.List()
  local saw_break = false

  for _, inline in ipairs(first_para.content) do
    if inline.t == "SoftBreak" or inline.t == "LineBreak" then
      if not saw_break then
        saw_break = true
      else
        body_lead:insert(inline)
      end
    elseif not saw_break then
      title_inlines:insert(inline)
    else
      body_lead:insert(inline)
    end
  end

  -- If we did not find a break, keep content for body and leave header to default caption
  if not saw_break and #title_inlines > 0 then
    body_lead = title_inlines
    title_inlines = pandoc.List()
  end

  local body_blocks = pandoc.List()
  if #body_lead > 0 then
    body_blocks:insert(pandoc.Para(body_lead))
  end

  -- append remaining original paragraphs
  for i = 2, #block.content do
    body_blocks:insert(block.content[i])
  end

  if #body_blocks == 0 then
    body_blocks:insert(pandoc.Para({}))
  end

  local badge_label = display .. (label and (" " .. label) or "")
  local badge_span = pandoc.Span(pandoc.List({ pandoc.Str(badge_label) }), pandoc.Attr("", { "theorem-badge" }))

  local header_children = pandoc.List({ badge_span })
  if #title_inlines == 0 then
    title_inlines = parse_inlines(display)
  end
  if #title_inlines > 0 then
    header_children:insert(pandoc.Span(title_inlines, pandoc.Attr("", { "theorem-title" })))
  end

  local header_div = pandoc.Div({ pandoc.Para(header_children) }, pandoc.Attr("", { "theorem-header" }))
  local content_div = pandoc.Div(body_blocks, pandoc.Attr("", { "theorem-content" }))

  local classes = { "math-theorem", callout_type }
  local attributes = { ["data-callout"] = callout_type }
  if label then
    attributes["data-label"] = label
  end

  return pandoc.Div({ header_div, content_div }, pandoc.Attr("", classes, attributes))
end

return {
  { BlockQuote = callout_from_blockquote }
}
