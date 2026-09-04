## Underdeck High-Level Product Logic Update

Underdeck should not be understood as only a local game launcher or local media library. The final product direction is: **Underdeck is a customizable organization system for local and cloud-based objects.**

It should allow users to classify, store, reference, move, import, enrich, and customize different kinds of objects. These objects may come from:

1. Local folders/files
2. Local archives
3. Cloud APIs
4. External metadata providers
5. Manual user input
6. Future online libraries or remote object sources
7. ...

Therefore, the app architecture must not assume that every deck is local-file-based. Game Deck currently behaves like a local library:

Game Deck
  Source: local folders / archives
  Entry: game folder or game archive
  Item: launcher / executable
  Import method: scanning, archive extraction, launcher detection

But Album Deck may eventually behave like an online metadata library:

Album Deck
  Source: Spotify API / MusicBrainz API 
  Entry: album object
  Item: track object
  Import method: online search, API import

Both should use the same generic Underdeck architecture. The key is that we NEED to have a very complete generic Underdeck architecture to define these things

## Core Principle

The most important architectural principle is:

A deck is never hardcoded. A deck is constructed from its definition.

That means the Settings page is not merely a place to edit some album-specific or game-specific options. It is the place where the user defines what the deck is. The deck’s UI, naming, import methods, source behavior, metadata layout, provider behavior, and item hierarchy should all be generated from the deck setting and definition.

Please make sure you understand that Setting page is the place to configure and customize deck such that it becomes the so called 'Album Deck", therefore all deck must share the same UI regardless of what they do. Currently you already added naming section (Entry and Item Names, Album entries are album folders or archives. Items are tracks) but if I change these name, for example from "Album" to "Game", then the name of the deck, anything that mentioned "Album" in the UI should directly reflect this change please. Or, i should say, the ENTIRE deck's UI is supposed to be constructed by these definitions from the setting. They are the founding block for the deck.

Therefore, there should NOT be any specific deck-hardcoded language in the setting page. Currently there are so many notes and keyword that are hardcoded for album deck specifically in album deck's setting.
## Setting

Decks must come before Library because Decks defines the deck ontology/ So the layout should be in this order:

1. General

只管 Underdeck 这个 app 的全局，比如说这个软件整体怎么运行

2. Decks

它回答的问题是，比如说：

这个 deck 叫什么？这个 deck 里的 Entry 叫什么？这个 deck 里的 Item 叫什么？Entry 和 Item 是什么关系？这个 deck 的 metadata sections 怎么排列？这个 deck 的默认 UI 应该怎么生成？这个 deck 用什么组织方式？

所以可以有这些section

- Deck identity
	- Deck name
	- Deck description
	- Deck icon

- Entry/Item Definition
	- Entry/Item singular label
	- Entry/Item plural label
	- Entry/Item type
	- Entry/Item description

- Hierarchy
	- Entry contains Items
	- Optional nested levels later

- Metadata (this control Entry/Item's metadata definition)
	- Which fields show on detail page (e.g. for album deck, it would be year and artist etc)
	- Section order
	- Visible/hidden fields

- Organization
	- Categories（这里就是可以把object的Categories命名为Genres的地方 for album deck specifically）
	- Tags
	- Ratings
	- Favorites
	- Notes
	- etc

3. Library 

Library 是定义数据来源和导入方式的地方。

它回答的问题是：

Entry 从哪里来？Item 从哪里来？是从本地 folder 扫描？是从 archive 解压？是从 Spotify API 搜索导入？是手动创建？metadata 和 image cache 存在哪里？扫描、解压、导入规则是什么？

比如以下一些使用案例，Game Deck 的本地来源：

```
Source type:
  local_folder / local_archive

Entry source object:
  folder / archive

Item source object:
  executable

Import methods:
  scan (e.g. detect launchers)
  extract archive
  ...
```

Album Deck 的本地来源：

```
Source type:
  local_folder

Entry source object:
   folder

Item source object:
  audio file

Import methods:
  scan (e.g. read audio metadata)
```

或者是Album Deck 的 Spotify 来源：

```
Source type:
  online_api

- Provider:
  Spotify

Entry source object:
  Spotify album object

Item source object:
  Spotify track object

Import methods:
  search Spotify
  import album metadata, tracklist, cover image URL
```

所以 Settings / Library 里面大概可以有（这只是举例子）：

```
Sources
  Local folders
  Local archives
  Online API sources
  - Provider
  Manual sources

Import & Extraction
  Scanning (e.g. like how to scan and what to look for given a source)
  Archive extractor (e.g. ZIP / 7-Zip / WinRAR / custom extractor)
  Import behavior
  Duplicate handling

Metadata Cache
  Metadata cache location
  Load metadata cache
  Clear metadata cache （must come with a warning）
 
Image Cache
  Cover cache location
  Gallery image cache location
  Clear image cache （must come with a warning）
```

重点是：Library 不定义 Album 是什么，也不定义 Track 是什么。Library 只定义这些对象从哪里来、怎么导入。

## Source 和 Provider 又怎么分？

这个也要分清楚。

Settings/ Library / Sources 管的是：

这个 provider 能不能创建新的 Entry / Item？（这里的provider有哪些选项应该取决于Provider section定义了哪些 所以可以在这里provider那里加一个转跳到provider page for customization的途径，现在我们已经有好几个provider了）

Settings / Providers 管的是：

这个 provider 如何作为外部身份、链接、metadata 来源附着到已有 Entry / Item 上？

例如 Spotify：

```
Spotify as Library Source (Provider):
  搜索 Spotify album
  导入 album entry
  导入 track items
  导入 cover / metadata
```

```
Spotify as Provider:
  给某个 album entry 绑定 Spotify album ID
  给某个 track item 绑定 Spotify track ID
  生成 Spotify URL
  刷新 Spotify metadata
```

DLsite 也一样：

```
DLsite as Library Source:
  搜索 DLsite work
  用 DLsite metadata 创建 game entry
```

```
DLsite as Provider:
  给已有 game entry 绑定 DLsite product ID / URL
  拉取 gallery / cover / metadata
```



以上这些都是high-level conceptual advise, NOT practical implementation. 请你根据已有的data structure进行重写和修改 only if needed。type比方说有DeckDefinition, entryDefinition, itemDefinition, hierarchy: {
    rootType: string;
    childType: string;
  };

## 用例对比

### Example 1: Game Deck

Game Deck的设置案例大概如下

Settings / Decks：
```
Deck name:
  Game

Entry:
  Game / Games
  
- Entry Metadata:
	Version, ID
	Platform, Engine
	Created, Modified
	Last played

- Entry Layout:
  Gallery
  Title
  Category & Tags
  Rating
  Providers
  Items (which are named "launchers" here)
  Entry Metadata
  Item Metadata
  Notes

Item:
  Launcher / Launchers
  
- Item Metadata: 
  Executable path
- Item Layout: N/A (if this is otherwise enabled, then each item is clickable into a new subpage, currently disabled for game and album)


Hierarchy:
  Game Entry
  └── Launcher Item
  └── Launcher Item
  └── Launcher Item

```

Settings / Library / Sources：

```
Source 1:
  type = local_folder
  entry Object Type = game_folder
  item Object Type = executable
  methods = scan (e.g. detect_launchers)

Source 2:
  type = local_archive
  entry Object Type = archive
  item Object Type = executable
  methods = extract
```

### Example 2 Album Deck (Local source)
Album Deck的设置案例大概如下

Settings / Deck：
```
Deck name:
  Album

Entry:
  Album / Albums
  
- Entry Metadata:
	Artist, Producer
	Year, Genre
	Tracks, Duration

- Entry Layout:
  Gallery
  Title
  Entry Metadata
  Category & Tags
  Rating
  Providers
  Items (which are named "tracks" here)
  Notes

Item:
  Track / Tracks
  
- Item Metadata: N/A
- Item Layout: N/A (if this is otherwise enabled, then each item is clickable into a new subpage, currently disabled for game and album)


Hierarchy:
  Album Entry
  └── Track Item
  └── Track Item
  └── Track Item
  └── ...

```


Source:
```
  type = local_folder
  entry Object Type = album_folder
  item Object Type = audio_file
  methods = scan
```

### Example 3: Album Deck (Spotify as source)

Settings / Decks / Album Deck stays the same, only Settings / Library / Sources changes:

```
Source:
  type = online_api
  providerType = spotify
  entry Object Type = spotify_album
  item Object Type = spotify_track
  methods = search_api
```

This is the point: local Album Deck and Spotify Album Deck share the same deck definition, but use different library sources.


数据结构可以这样写，举个high level大概的例子：
```
type Entry = {
  id: string;
  deckId: string;
  entryType: string;

  // Core identity
  title: string;
  subtitle?: string;
  coverPath?: string | null;
  createdAt: string;
  updatedAt: string;

  // Organization
  category?: string;
  tags: string[];
  rating?: number;
  favorite?: boolean;
  notes?: string;

  // Custom/deck-specific metadata
  metadata: Record<string, unknown>;

  // External identity
  providerLinks: ProviderLink[];

  // Children
  items: EntryItem[];
};
```

Launcher item 同理。