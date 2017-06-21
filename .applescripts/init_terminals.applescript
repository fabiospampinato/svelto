tell application "Visual Studio Code" to activate
tell application "System Events"
	# Start
	repeat 20 times
		keystroke "\\" using {shift down, control down, option down, command down}
	end repeat
	# Base
	keystroke "`" using control down
  delay 0.25
	keystroke "gulp build --fresh && gulp watch"
	# Demo
	keystroke "n" using command down
  delay 0.25
	keystroke "cd demo"
	keystroke return
  delay 0.1
  keystroke "meteor run"
	# End
	keystroke "[" using {shift down, control down, option down, command down}
	keystroke "`" using control down
end tell
