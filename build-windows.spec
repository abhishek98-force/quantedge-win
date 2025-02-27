# -*- mode: python ; coding: utf-8 -*-


block_cipher = None
added_files = [
    ('.\\gui', 'gui'),
    ('.\\backend\\test.db', 'backend'),
]

a = Analysis(['.\\backend\\index.py'],
             pathex=['.\\dist'],
             binaries=[],
             datas=added_files,
             hiddenimports=['clr','pydantic','pydantic-core','pydantic.deprecated.decorator'],
             hookspath=[],
             hooksconfig={},
             runtime_hooks=[],
             excludes=[],
             win_no_prefer_redirects=False,
             win_private_assemblies=False,
             cipher=block_cipher,
             noarchive=False)
pyz = PYZ(a.pure, a.zipped_data,
             cipher=block_cipher)

exe = EXE(pyz,
          a.scripts,
          a.binaries,
          a.zipfiles,
          a.datas,
          [],
          name='pywebview-react',
          debug=False,
          bootloader_ignore_signals=False,
          strip=False,
          upx=True,
          upx_exclude=[],
          icon='.\\backend\\assets\\logo.ico',
          runtime_tmpdir=None,
          console=False,
          disable_windowed_traceback=False,
          target_arch=None,
          codesign_identity=None,
          entitlements_file=None )
