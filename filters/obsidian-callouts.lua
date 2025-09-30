-- Obsidian-style callouts to Quarto mathematical callouts

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
  note = "note",
  example = "example",
  ex = "example",
  proof = "proof",
  warning = "warning",
  caution = "caution"
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
  caution = "Caution"
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

local function parse_blocks(str)
  if not str or trim(str) == "" then
    return pandoc.List()
  end
  local doc = pandoc.read(str, "markdown")
  return doc.blocks
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

  local first = block.content[1]
  if first.t ~= "Para" then
    return nil
  end

  local first_str = pandoc.utils.stringify(first)
  local ctype, label, rest = first_str:match("^%[!([%w%-]+)%|([^%]]-)%]%s*(.*)$")
  if not ctype then
    ctype, rest = first_str:match("^%[!([%w%-]+)%]%s*(.*)$")
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
  rest = trim(rest or "")

  local body_blocks = pandoc.List()
  if rest ~= "" then
    for _, blk in ipairs(parse_blocks(rest)) do
      body_blocks:insert(blk)
    end
  end
  for i = 2, #block.content do
    body_blocks:insert(block.content[i])
  end
  if #body_blocks == 0 then
    body_blocks:insert(pandoc.Para({}))
  end

  local badge_text = display
  if label then
    badge_text = badge_text .. " " .. label
  end

  local title_inlines = parse_inlines(display)
  local badge_span = pandoc.Span(pandoc.List({ pandoc.Str(badge_text) }), pandoc.Attr("", { "math-callout-badge" }))
  local header_inlines = pandoc.List({ badge_span })
  if #title_inlines > 0 then
    header_inlines:insert(pandoc.Space())
    header_inlines:insert(pandoc.Span(title_inlines, pandoc.Attr("", { "math-callout-title" })))
  end

  local header_para = pandoc.Para(header_inlines)
  local header_div = pandoc.Div({ header_para }, pandoc.Attr("", { "math-callout-header" }))
  local body_div = pandoc.Div(body_blocks, pandoc.Attr("", { "math-callout-body" }))

  local classes = { "math-callout", "callout-" .. callout_type }
  local attributes = { ["data-callout"] = callout_type }
  if label then
    attributes["data-label"] = label
  end
  return pandoc.Div({ header_div, body_div }, pandoc.Attr("", classes, attributes))
end

return {
  {
    BlockQuote = callout_from_blockquote
  }
}
