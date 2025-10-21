# Put auxiliary files under build/
$aux_dir = 'build';

# Emulate aux directory for engines lacking native support (e.g., pdfTeX)
$emulate_aux_dir = 1;

# Disable SyncTeX so no .synctex.gz is generated
$pdflatex = 'pdflatex -synctex=0 %O %S';
$lualatex = 'lualatex -synctex=0 %O %S';
$xelatex = 'xelatex -synctex=0 %O %S';
$synctex = 0;
