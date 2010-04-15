#!/usr/bin/python

import os
import os.path
import sys
import time

from glob import glob

def watch(watched, f):
    mtimes = []

    if len(mtimes) == 0:
        for path in watched:
            mtimes.append(os.path.getmtime(path))
    
    try:        
        while True:
            for index in range(len(watched)):
                path = watched[index]
                mtime = os.path.getmtime(path)
                if mtime != mtimes[index]:
                    print '\n\n[INFO] %s modified\n\n' % path
                    f()
                    mtimes[index] = mtime
            #VARIABLE        
            time.sleep(1)
    except KeyboardInterrupt:
        pass

def visit(watched, dirname, names):
    for name in names:
        if name.startswith('.') or os.path.isdir(os.path.join(dirname, name)):
            i = names.index(name)
            del names[i]
            continue

        #VARIABLE
        if name.endswith('.js'):
            watched.append(os.path.join(dirname,name))   


def run():
    #VARIABLE
    os.system('')

if __name__ == '__main__':
    watched = []
    root = os.getcwd()
    os.path.walk(root, visit, watched)

    run()
    if len(sys.argv) > 1 and sys.argv[1] in ['-f', '--forever']:
        print 'Running forever...'
        watch(watched, run)
