-- Auto Title Filter
-- Set title/pagetitle from filename when not provided in YAML

local function filename_without_extension(path)
  if not path then return nil end
  local filename = path:match("([^/\\]+)$") or path
  -- strip the last extension
  local name = filename:gsub("%.[%w%-_]+$", "")
  -- prettify separators
  name = name:gsub("_", " "):gsub("%-", " ")
  return name
end

local function resolve_doc_name()
  -- Prefer the real input file when available
  if PANDOC_STATE and PANDOC_STATE.input_files and #PANDOC_STATE.input_files > 0 then
    return filename_without_extension(PANDOC_STATE.input_files[1])
  end
  -- Fallback to the output filename when Pandoc reads from stdin (quarto-input*)
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

function Meta(meta)
  local name = resolve_doc_name()
  if name then
    if is_nil_or_empty(meta.title) then
      meta.title = pandoc.MetaString(name)
    end
    if is_nil_or_empty(meta.pagetitle) then
      meta.pagetitle = pandoc.MetaString(name)
    end
  end
  return meta
end
