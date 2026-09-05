Another key correction is: **“shown on the detail page” and “stored as metadata” are not the same thing.**

A detail page layout can render fields from several namespaces:

```txt
Entry Core Fields
Entry Source Fields
Entry Organization Fields
Entry Metadata Fields
Entry Generated Fields
Entry Provider Fields
Item Summary Fields
```

So `createdAt` and `modifiedAt` can absolutely appear on the detail page, but I would still not call them normal metadata. Better distinction, I would, for example, define it like this:

```
Core Fields:
  id
  deckId / entryId
  entryType / itemType
  title
  subtitle
  coverPath
  galleryImages
  createdAt
  modifiedAt
  updatedAt
```

These are related to Underdeck’s own object model. They exist because Underdeck created or manages this Entry / EntryItem.

Then, Source Fields:
```
  sourceType
  sourceRef
  sourcePath
  folderPath
  archivePath
  filePath
  executablePath
  fileSize
  fileCreatedAt
  fileModifiedAt
  fileExists
```

These are not really “core Underdeck identity.” They describe the thing Underdeck imported or references.

```txt
Core/Source Fields:
Organization Fields (editable):
  category
  tags
  rating
  favorite
  notes
  locked
  etc.

Metadata Fields (editable):
  version
  platform
  engine
  publisher
  etc.

Generated Fields (these should NOT be editable):
  e.g.trackCount (which is just how many items are in this entry; i believe that in game deck, this is also used to indicate number of launcher avaliable in that folder)
  totalDuration
  primaryExecutablePath (derived from the primary Launcher item)
  lastPlayed or lastOpened (only if generated from launch history)
  above are all just examples
  etc

Provider Fields:
  DLsite ID
  Spotify album ID
  MusicBrainz release ID
```

So the real structure should be:

```txt
Entry Field Schema:
  Core/Source fields
  Organization fields
  Metadata fields
  Generated fields
  Provider fields

Entry Layout:
  decides which of these fields are displayed and in what order
```

Why make such distinction? especially for generated field? because i think, for example, `lastPlayed` is usually app-derived. It comes from Underdeck’s own launch history, so `lastPlayed` is not really user metadata. It is an system field, or a generated field. The correct model is not “metadata means displayed fields.” The correct model is:

```txt
Field exists somewhere.
Layout decides whether to display it.
Metadata is only one category of field.
```

