-- Auto Title Filter
-- Set title/pagetitle when not provided in YAML
-- Priority: explicit title > first H1 header > filename

local function filename_without_extension(path)
  if not path then return nil end
  local filename = path:match("([^/\\]+)$") or path
  local name = filename:gsub("%.[%w%-_]+$", "")
  name = name:gsub("_", " "):gsub("%-", " ")
  return name
end

local function resolve_doc_name()
  if PANDOC_STATE and PANDOC_STATE.input_files and #PANDOC_STATE.input_files > 0 then
    return filename_without_extension(PANDOC_STATE.input_files[1])
  end
  if PANDOC_STATE and PANDOC_STATE.output_file then
    return filename_without_extension(PANDOC_STATE.output_file)
  end
  return nil
end

local function is_nil_or_empty(meta_val)
  if meta_val == nil then return true end
  if type(meta_val) == "table" then
    if meta_val.t == "MetaString" then
      return (meta_val.text or "") == ""
    elseif meta_val.t == "MetaInlines" or meta_val.t == "MetaBlocks" then
      return #meta_val == 0
    end
  end
  return false
end

function Pandoc(doc)
  local meta = doc.meta
  local need_title = is_nil_or_empty(meta.title)
  local need_pagetitle = is_nil_or_empty(meta.pagetitle)

  if need_title or need_pagetitle then
    -- Try first H1 header
    local h1_text = nil
    for _, blk in ipairs(doc.blocks) do
      if blk.t == "Header" and blk.level == 1 then
        h1_text = pandoc.utils.stringify(blk.content)
        if h1_text and h1_text ~= "" then break end
      end
    end

    local fallback = h1_text or resolve_doc_name() or "Untitled"
    if need_title then meta.title = pandoc.MetaString(fallback) end
    if need_pagetitle then meta.pagetitle = pandoc.MetaString(fallback) end
  end

  return pandoc.Pandoc(doc.blocks, meta)
end
