import os
import shutil
import argparse
import sys
import math
import datetime


currnt_directory = os.getcwd()

# organize file by extension
def by_extension(path):
    files = [file for file in os.listdir(
        path) if os.path.isfile(os.path.join(path, file))]  # listing all files in given folder
    types = []  # all file types will be stored here
    for i in files:
        a1 = i[::-1].find(".")
        a2 = i[-a1:]
        if a2 not in types:
            types.append(a2)
    for i in types:
        if not os.path.exists(os.path.join(path, i)):
            os.mkdir(os.path.join(path, i))
    for i in files:
        isType(i, types,path)
    print("done")
        
def isType(filename, types,path):
    a1 = filename[::-1].find('.')
    a2 = filename[-a1:]
    if a2 in types:
        shutil.move(os.path.join(path,filename), os.path.join(path,a2))

# organise by size
def by_size(path):
    files = os.listdir(path)
    file_size1 = {}
    for i in files:
        file_size1[i] = os.stat(os.path.join(path, i)).st_size
    sorted_file = sorted(file_size1.items(), key=lambda x: x[1])
    file_size0 = []
    size_types = []
    for i in sorted_file:
        f1 = (os.stat(os.path.join(path, i[0])).st_size)
        f2 = convert_size(f1)
        f3 = str(f2).split("_")
        if f3 == [] or f3 == ["0B"]:
            pass
        else:
            file_size0.append(f3)
    types = []
    sub = "."
    for i in sorted_file:
        if sub in i[0]:
            a1 = i[0][::-1].find(".")
            a2 = i[0][-a1:]
            if a2 not in types:
                types.append(a2)

    # folder creation according to size
    for i in file_size0:
        if i[1] not in size_types:
            size_types.append(i[1])
    for i in size_types:
        for k in file_size0:
            if k[1] == i and int(k[0]) > 50:
                if not os.path.exists(os.path.join(path, "50"+k[1])):
                    os.mkdir(os.path.join(path, "50"+k[1]))
            elif k[1] == i and int(k[0]) < 50:
                if not os.path.exists(os.path.join(path, "100"+k[1])):
                    os.mkdir(os.path.join(path, "100"+k[1]))

    # move files to their respective folders
    new_files = [file for file in os.listdir(
        path) if os.path.isfile(os.path.join(path, file))]
    for i in new_files:
        size_new = convert_size(os.stat(os.path.join(path, i)).st_size)
        size_new = size_new.split("_")
        if int(size_new[0]) < 50:
            if os.path.exists(os.path.join(path, "50"+size_new[1])):
                shutil.move(os.path.join(path, i),
                            os.path.join(path, "50"+size_new[1]))
            else:
                shutil.move(os.path.join(path, i),
                            os.path.join(path, "100"+size_new[1]))
        else:
            if os.path.exists(os.path.join(path, "100"+size_new[1])):
                shutil.move(os.path.join(path, i),
                            os.path.join(path, "100"+size_new[1]))
    print("done")



# by last modification
def by_use(path):
    files = [file for file in os.listdir(
        path) if os.path.isfile(os.path.join(path, file))]
    for i in files:
        mtime = (os.stat(os.path.join(path, i)).st_atime)
        timestamp = datetime.datetime.fromtimestamp(mtime).strftime('%Y-%m-%d')
        cur_date = datetime.datetime.now().strftime('%Y-%m-%d')
        d1 = datetime.date(int(timestamp[:4]),int(timestamp[5:7]),int(timestamp[8:]))
        d2 = datetime.date(int(cur_date[:4]),int(cur_date[5:7]),int(cur_date[8:]))
        d3=str(d2-d1)
        if int(d3[:-14])<10:
            if not os.path.exists(os.path.join(path,"Less than 10 Days")):
                os.mkdir(os.path.join(path,"Less than 10 Days"))
            shutil.move(os.path.join(path,i),os.path.join(path,"Less than 10 Days"))
        elif int(d3[:-14])<20:
            if not os.path.exists(os.path.join(path,"Less than 20 Days")):
                os.mkdir(os.path.join(path,"Less than 20 Days"))
            shutil.move(os.path.join(path,i),os.path.join(path,"Less than 20 Days"))
        else:
            if not os.path.exists(os.path.join(path,"More than 20 Days")):
                os.mkdir(os.path.join(path,"More than 20 Days"))
            shutil.move(os.path.join(path,i),os.path.join(path,"More than 20 Days"))
    print("done")





def convert_size(size_bytes):
    if size_bytes == 0:
        return "0B"
    size_name = ("B", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB")
    i = int(math.floor(math.log(size_bytes, 1024)))
    p = math.pow(1024, i)
    s = round(size_bytes / p, 2)
    return "%s_%s" % (round(s), size_name[i])

def resetFile(path):
    a= [x for x in os.walk(path)]
    for i in a:
        for b in i[2]:
            p1=(os.path.join(i[0],b))
            shutil.move(p1,path)
    folder = [folder for folder in os.listdir(path) if os.path.isfile(os.path.join(path,folder))==False]
    for i in folder:
        os.rmdir(os.path.join(path,i))
    
    print("done")
    

def main():
    parser = argparse.ArgumentParser()
    parser.add_argument("--path", type=str,
                        default=currnt_directory, help="Enter directory path")
    parser.add_argument("--d", type=str, default="organized",
                        help="Enter directory name")
    parser.add_argument("--o", type=str, default="extension",
                        help="Enter orgainsing methond,('extension,size,use')")

    args = parser.parse_args()
    organise(args)

    
def organise(args):
    if args.o == "extension":
        by_extension(args.path)
    elif args.o =="size":
        by_size(args.path)
    elif args.o =="use":
        by_use(args.path)
    elif args.o=="reset":
        resetFile(args.path)




if __name__ == "__main__":
    main()
