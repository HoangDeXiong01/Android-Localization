# Gives the debug build its own package name (<appId>.debug) so it installs side by side with the release build.
# The namespace is untouched, so only the installed package name changes.
import re
p = 'android/app/build.gradle'
s = open(p).read()
if 'applicationIdSuffix' in s:
    raise SystemExit('already patched')
s, n = re.subn(r'(\n    buildTypes \{)', r'\1\n        debug {\n            applicationIdSuffix ".debug"\n            versionNameSuffix "-debug"\n        }', s, count=1)
if n != 1:
    raise SystemExit('build.gradle layout not recognised')
open(p, 'w').write(s)
print('debug applicationIdSuffix added')
