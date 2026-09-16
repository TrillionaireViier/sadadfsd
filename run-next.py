import pty
import os
import time

master, slave = pty.openpty()
pid = os.fork()

if pid == 0:
    os.setsid()
    os.dup2(slave, 0)
    os.dup2(slave, 1)
    os.dup2(slave, 2)
    os.close(master)
    os.close(slave)
    os.execlp("npm", "npm", "run", "dev")
else:
    os.close(slave)
    while True:
        time.sleep(1)
