import os
import shutil
from setuptools import setup



def tree(src):
    return [
        (root, [os.path.join(root, f) for f in files])  # Convert map to list
        for (root, dirs, files) in os.walk(os.path.normpath(src))
    ]


if os.path.exists("build"):
    shutil.rmtree("build")

if os.path.exists("dist/index.app"):
    shutil.rmtree("dist/index.app")

ENTRY_POINT = ["backend/index.py"]

DATA_FILES = tree("gui")

DATA_FILES = tree("gui")

# Print the tree structure
print("Data Files Structure:", DATA_FILES)



OPTIONS = {
    "argv_emulation": False,
    "strip": False,
    "iconfile": "backend/assets/logo.icns",
    "packages": ["WebKit", "Foundation", "webview","uvicorn","fastapi","anyio"],
    "plist": {"NSRequiresAquaSystemAppearance": False},
    "resources": DATA_FILES,
}

setup(
    app=ENTRY_POINT,
    options={"py2app": OPTIONS},
    setup_requires=["py2app"],
)
