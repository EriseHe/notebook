-- Auto Title Filter
-- Set title/pagetitle when not provided in YAML
-- Rule: use the source filename (via output_file basename) when metadata title is missing

local function filename_without_extension(path)
  if not path then return nil end
  local filename = path:match("([^/\\]+)$") or path
  local name = filename:gsub("%.[%w%-_]+$", "")
  name = name:gsub("_", " "):gsub("%-", " ")
  return name
end

local function resolve_doc_name()
  -- Prefer the output filename Quarto derives from the original source path
  if PANDOC_STATE and PANDOC_STATE.output_file then
    return filename_without_extension(PANDOC_STATE.output_file)
  end
  -- Fallback to input file (may be a temporary 'quarto-input*')
  if PANDOC_STATE and PANDOC_STATE.input_files and #PANDOC_STATE.input_files > 0 then
    return filename_without_extension(PANDOC_STATE.input_files[1])
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
    local name = resolve_doc_name() or "Untitled"
    if need_title then meta.title = pandoc.MetaString(name) end
    if need_pagetitle then meta.pagetitle = pandoc.MetaString(name) end
  end

  return pandoc.Pandoc(doc.blocks, meta)
end
