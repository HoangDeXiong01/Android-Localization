import os, shutil
d = 'android/app/src/main/java/com/hoangdexiong01/localization'
if not os.path.isdir(d):
    raise SystemExit('Android package dir not found: ' + d)
for f in ('FileSaverPlugin.java', 'MainActivity.java'):
    shutil.copy(os.path.join('android-native', f), os.path.join(d, f))
print('FileSaver plugin installed')
