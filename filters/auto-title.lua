-- Auto Title Filter
-- If a document has no explicit title in YAML, use the source filename (sans extension)

local function filename_without_extension(path)
  local filename = path:match("([^/\\]+)$") or path
  -- strip last extension
  local name = filename:gsub("%.[%w%-_]+$", "")
  -- replace underscores/dashes with spaces for nicer display
  name = name:gsub("_", " "):gsub("%-", " ")
  return name
end

function Meta(meta)
  -- Only set when title is missing or empty
  if not meta.title or (type(meta.title) == "table" and meta.title.t == "MetaString" and meta.title.text == "") then
    local inputs = PANDOC_STATE and PANDOC_STATE.input_files or nil
    if inputs and #inputs > 0 then
      local name = filename_without_extension(inputs[1])
      meta.title = pandoc.MetaString(name)
    end
  end
  return meta
end
