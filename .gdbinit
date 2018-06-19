# auto-load
set auto-load safe-path /

# gdb-dashboard
define sd
    source ~/.gdb-dashboard
    dashboard -output /dev/pts/$arg0
    dashboard -layout registers assembly history expressions stack
    dashboard -style style_low '1;35'
    dashboard -style style_selected_1 '1;34'
    b main
    r
end

define dw
    dashboard expressions watch $arg0
end

# peda
define peda
    source ~/.peda/peda.py
end
