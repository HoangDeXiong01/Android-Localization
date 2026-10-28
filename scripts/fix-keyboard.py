# Makes the soft keyboard resize the WebView in the generated Capacitor Android project.
# Capacitor 8 + Android 15/16 edge-to-edge: without an explicit mode the system and the WebView
# disagree on who handles the IME, so focused fields jump or end up hidden behind the keyboard.
p = 'android/app/src/main/AndroidManifest.xml'
s = open(p, encoding='utf-8').read()
if 'windowSoftInputMode' in s:
    raise SystemExit('already patched')
needle = 'android:name=".MainActivity"'
if needle not in s:
    raise SystemExit('AndroidManifest layout not recognised')
s = s.replace(needle, needle + '\n            android:windowSoftInputMode="adjustResize"', 1)
open(p, 'w', encoding='utf-8').write(s)
print('windowSoftInputMode=adjustResize added')
