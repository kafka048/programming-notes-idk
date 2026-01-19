# GIT COMMANDS TO PUSH THESE NOTES
1. git add typescript/ -> this stages a particular folder and not all of the changes made. 
2. git commit -m "docs: add notes"
3. git push

OR 

1. cd typescript/
2. git add .
3. git commit -m "docs: update notes"
4. git push
Just enter the directory and stage the notes


# GIT COMMANDS USING REBASE

1. git pull --rebase origin main -> if you made remote commits, then git will not allow you to push from your local. you have to run this command to fetch the remote commits first and then replay our current commit on top of that
2. git push

if you want to intentionally overwrite the remote commits
1. git push --force 
This rewrites history and can delete remote commits.
Use only when you own the branch and intend to overwrite.

# TO INSTALL THE TYPES WHEN INSTALLING LIBRARIES
1. npm i library-name -> this is how you install the libraries generally.
    usually, most libraries ship the types together and they also get installed.
    incase they do not,

2. npm i -D @types/library-name

