-- Auto Title Filter
-- Set title/pagetitle from filename when not provided in YAML

local function filename_without_extension(path)
  local filename = path:match("([^/\\]+)$") or path
  -- strip the last extension
  local name = filename:gsub("%.[%w%-_]+$", "")
  -- prettify separators
  name = name:gsub("_", " "):gsub("%-", " ")
  return name
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
  local inputs = PANDOC_STATE and PANDOC_STATE.input_files or nil
  if inputs and #inputs > 0 then
    local name = filename_without_extension(inputs[1])
    if is_nil_or_empty(meta.title) then
      meta.title = pandoc.MetaString(name)
    end
    if is_nil_or_empty(meta.pagetitle) then
      meta.pagetitle = pandoc.MetaString(name)
    end
  end
  return meta
end
