# Adds a release signing config (read from environment variables) to the generated Capacitor Android project.
import re
p = 'android/app/build.gradle'
s = open(p).read()
if 'signingConfigs' in s:
    raise SystemExit('already patched')
signing = '''    signingConfigs {
        release {
            storeFile file(System.getenv("KEYSTORE_PATH"))
            storePassword System.getenv("KEYSTORE_PASSWORD")
            keyAlias System.getenv("KEY_ALIAS")
            keyPassword System.getenv("KEYSTORE_PASSWORD")
        }
    }
'''
s, n1 = re.subn(r'(\n    buildTypes \{)', '\n' + signing.rstrip('\n') + r'\1', s, count=1)
s, n2 = re.subn(r'(    buildTypes \{\n        release \{\n)', r'\1            signingConfig signingConfigs.release\n', s, count=1)
if n1 != 1 or n2 != 1:
    raise SystemExit('build.gradle layout not recognised')
open(p, 'w').write(s)
print('signing config added')
