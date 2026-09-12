import os, sys

def daemonize():
    if os.fork() > 0:
        sys.exit(0)
    os.setsid()
    if os.fork() > 0:
        sys.exit(0)
    
    sys.stdout.flush()
    sys.stderr.flush()
    
    with open('/dev/null', 'r') as f:
        os.dup2(f.fileno(), sys.stdin.fileno())
    with open('next.log', 'a+') as f:
        os.dup2(f.fileno(), sys.stdout.fileno())
    with open('next.err', 'a+') as f:
        os.dup2(f.fileno(), sys.stderr.fileno())
        
    os.environ["CI"] = "true"
    os.execlp("node", "node", "server.js")

if __name__ == '__main__':
    daemonize()
