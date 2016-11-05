

import subprocess


def create_json_from_txt(txtfile):
    infile = txtfile.temporary_file_path()
    outfile = 'tmp.json' # change outfile name
    p = subprocess.run(
        ['node_modules/.bin/dna2json', infile, outfile],
        stdin=None,
        stderr=subprocess.PIPE,
        universal_newlines=True,
    )

    if p.returncode != 0:
        raise Exception("Could not run dna2json: " + p.stderr)
    raise Exception(type(txtfile))
