tell application "Visual Studio Code" to activate
tell application "System Events"
	# Start
	repeat 20 times
		keystroke "\\" using {shift down, control down, option down, command down}
	end repeat
	# Base
	keystroke "`" using control down
	keystroke "clear && pwd"
	keystroke return
	# Demo
	keystroke "n" using command down
	keystroke "cd demo"
	keystroke return
	keystroke "clear && pwd"
	keystroke return
	# End
	keystroke "[" using {shift down, control down, option down, command down}
	keystroke "`" using control down
end tell
