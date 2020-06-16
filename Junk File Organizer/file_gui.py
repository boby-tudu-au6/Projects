from PyQt5 import QtCore, QtGui, QtWidgets
import os
import shutil
import math
import sys
import datetime


class Ui_MainWindow(object):
    def setupUi(self, MainWindow):
        MainWindow.setObjectName("MainWindow")
        MainWindow.resize(800, 304)
        self.centralwidget = QtWidgets.QWidget(MainWindow)
        self.centralwidget.setObjectName("centralwidget")
        self.verticalLayout_2 = QtWidgets.QVBoxLayout(self.centralwidget)
        self.verticalLayout_2.setObjectName("verticalLayout_2")
        self.horizontalLayout = QtWidgets.QHBoxLayout()
        self.horizontalLayout.setObjectName("horizontalLayout")
        self.label = QtWidgets.QLabel(self.centralwidget)
        font = QtGui.QFont()
        font.setPointSize(12)
        self.label.setFont(font)
        self.label.setObjectName("label")
        self.horizontalLayout.addWidget(self.label)
        self.lineEdit = QtWidgets.QLineEdit(self.centralwidget)
        font = QtGui.QFont()
        font.setPointSize(12)
        self.lineEdit.setFont(font)
        self.lineEdit.setObjectName("lineEdit")
        self.horizontalLayout.addWidget(self.lineEdit)
        self.pushButton = QtWidgets.QPushButton(self.centralwidget)
        font = QtGui.QFont()
        font.setPointSize(12)
        self.pushButton.setFont(font)
        self.pushButton.setObjectName("pushButton")
        self.horizontalLayout.addWidget(self.pushButton)
        self.verticalLayout_2.addLayout(self.horizontalLayout)
        self.horizontalLayout_3 = QtWidgets.QHBoxLayout()
        self.horizontalLayout_3.setObjectName("horizontalLayout_3")
        self.label_3 = QtWidgets.QLabel(self.centralwidget)
        font = QtGui.QFont()
        font.setPointSize(12)
        self.label_3.setFont(font)
        self.label_3.setObjectName("label_3")
        self.horizontalLayout_3.addWidget(self.label_3)
        self.lineEdit_2 = QtWidgets.QLineEdit(self.centralwidget)
        font = QtGui.QFont()
        font.setPointSize(12)
        self.lineEdit_2.setFont(font)
        self.lineEdit_2.setObjectName("lineEdit_2")
        self.horizontalLayout_3.addWidget(self.lineEdit_2)
        self.verticalLayout_2.addLayout(self.horizontalLayout_3)
        self.horizontalLayout_2 = QtWidgets.QHBoxLayout()
        self.horizontalLayout_2.setObjectName("horizontalLayout_2")
        self.label_2 = QtWidgets.QLabel(self.centralwidget)
        font = QtGui.QFont()
        font.setPointSize(12)
        self.label_2.setFont(font)
        self.label_2.setObjectName("label_2")
        self.horizontalLayout_2.addWidget(self.label_2)
        self.comboBox = QtWidgets.QComboBox(self.centralwidget)
        font = QtGui.QFont()
        font.setPointSize(12)
        self.comboBox.setFont(font)
        self.comboBox.setObjectName("comboBox")
        self.comboBox.addItem("")
        self.comboBox.addItem("")
        self.comboBox.addItem("")
        self.comboBox.addItem("")
        self.horizontalLayout_2.addWidget(self.comboBox)
        self.verticalLayout_2.addLayout(self.horizontalLayout_2)
        self.pushButton_2 = QtWidgets.QPushButton(self.centralwidget)
        font = QtGui.QFont()
        font.setPointSize(12)
        self.pushButton_2.setFont(font)
        self.pushButton_2.setObjectName("pushButton_2")
        self.verticalLayout_2.addWidget(self.pushButton_2)
        MainWindow.setCentralWidget(self.centralwidget)
        self.menubar = QtWidgets.QMenuBar(MainWindow)
        self.menubar.setGeometry(QtCore.QRect(0, 0, 800, 26))
        self.menubar.setObjectName("menubar")
        MainWindow.setMenuBar(self.menubar)
        self.statusbar = QtWidgets.QStatusBar(MainWindow)
        self.statusbar.setObjectName("statusbar")
        MainWindow.setStatusBar(self.statusbar)

        self.currnt_directory = os.getcwd()

        self.retranslateUi(MainWindow)
        QtCore.QMetaObject.connectSlotsByName(MainWindow)

    def retranslateUi(self, MainWindow):
        _translate = QtCore.QCoreApplication.translate
        MainWindow.setWindowTitle(_translate("MainWindow", "File Organizer"))
        self.label.setText(_translate("MainWindow", "Directory path"))
        self.lineEdit.setText(_translate("MainWindow", self.getPath()))
        self.pushButton.setText(_translate("MainWindow", "Browse"))
        self.label_3.setText(_translate("MainWindow", "Enter Directoy Name"))
        self.lineEdit_2.setText(
            _translate("MainWindow", "Organized"))
        self.label_2.setText(_translate("MainWindow", "Organizing Option"))
        self.comboBox.setItemText(0, _translate("MainWindow", "extension"))
        self.comboBox.setItemText(1, _translate("MainWindow", "size"))
        self.comboBox.setItemText(2, _translate("MainWindow", "usage"))
        self.comboBox.setItemText(3, _translate("MainWindow", "reset"))
        self.pushButton_2.setText(_translate("MainWindow", "Organize"))

        self.pushButton.clicked.connect(self.getFolder)
        self.pushButton_2.clicked.connect(self.organize)

    def getPath(self):
        d = os.getcwd()
        return d

    def organize(self):
        d = {}
        d["path"] = self.lineEdit.text()
        d["directory"] = self.lineEdit_2.text()
        d['option'] = self.comboBox.currentText()
        if d['path'] == "":
            d['path'] = os.getcwd()
        if d['directory'] == "":
            d['directory'] = "Organized"
        if d['option'] == "extension":
            if os.path.exists(d['path']):
                self.by_extension(d['path'])
                self.moveFinal(d)
            else:
                print("Invalid path")
        elif d['option'] == "size":
            if os.path.exists(d['path']):
                self.by_size(d['path'])
                self.moveFinal(d)
            else:
                print("Invalid path")
        elif d['option'] == "usage":
            if os.path.exists(d['path']):
                self.by_use(d['path'])
                self.moveFinal(d)
            else:
                print("Invalid path")
        elif d['option'] == "reset":
            if os.path.exists(d['path']):
                self.resetFile(d['path'])
        else:
            print("Invalid path")
        # below code opens sucess message box
        msg = QtWidgets.QMessageBox()
        msg.setIcon(QtWidgets.QMessageBox.Information)
        msg.setWindowTitle("File organizer")
        msg.setText("All files have been organized")
        msg.exec_()

    def checkFile(self, filename):
        d = os.path.basename(__file__)
        if filename == d:
            return True
        return False
# below function is for move all small directory to final folder

    def moveFinal(self, d):
        allFolders = os.listdir(d['path'])
        if not os.path.exists(os.path.join(d['path'], d['directory'])):
            os.mkdir(os.path.join(d['path'], d['directory']))
            for i in allFolders:
                if self.checkFile(i) is False:
                    shutil.move(os.path.join(d['path'], i), os.path.join(
                        d['path'], d['directory']))
                else:
                    pass

# below function is for get current working directory path
# which is set to default value for --path
    def getFolder(self):
        d = QtWidgets.QFileDialog.getExistingDirectory(None, "select path")
        self.lineEdit.setText(str(d))

# now comes one of main function
# below function make folder and move all files to it
# based on their extension
    def by_extension(self, path):
        files = [file for file in os.listdir(path) if os.path.isfile(
            os.path.join(path, file))]  # listing all files in given folder
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
            self.isType(i, types, path)
        print("done")

# below function is checking all file type in given path
    def isType(self, filename, types, path):
        a1 = filename[::-1].find('.')
        a2 = filename[-a1:]
        if a2 in types:
            if self.checkFile(filename) is False:
                shutil.move(os.path.join(path, filename),
                            os.path.join(path, a2))
            else:
                pass

# below function is for organize junk files based on their size
    def by_size(self, path):
        files = os.listdir(path)
        file_size1 = {}
        for i in files:
            file_size1[i] = os.stat(os.path.join(path, i)).st_size
        sorted_file = sorted(file_size1.items(), key=lambda x: x[1])
        file_size0 = []
        size_types = []
        for i in sorted_file:
            f1 = (os.stat(os.path.join(path, i[0])).st_size)
            f2 = self.convert_size(f1)
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
                if k[1] == i and int(k[0]) < 50:
                    if not os.path.exists(os.path.join(path, "50"+k[1])):
                        os.mkdir(os.path.join(path, "50"+k[1]))
                elif k[1] == i and int(k[0]) > 50:
                    if not os.path.exists(os.path.join(path, "100"+k[1])):
                        os.mkdir(os.path.join(path, "100"+k[1]))

        # move files to their respective folders
        new_files = [file for file in os.listdir(
            path) if os.path.isfile(os.path.join(path, file))]
        f = [f for f in new_files if self.checkFile(f) is False]
        for i in f:
            size_new = self.convert_size(
                os.stat(os.path.join(path, i)).st_size)
            size_new = size_new.split("_")
            if int(size_new[0]) < 50:
                shutil.move(os.path.join(path, i),
                            os.path.join(path, "50"+size_new[1]))
            else:
                shutil.move(os.path.join(path, i),
                            os.path.join(path, "100"+size_new[1]))
        print("done")

    # below function organize all files by their last usage date in given path
    def by_use(self, path):
        files = [file for file in os.listdir(
            path) if os.path.isfile(os.path.join(path, file))]
        f = [f for f in files if self.checkFile(f) is False]
        for i in f:
            mtime = (os.stat(os.path.join(path, i)).st_atime)
            timestamp = datetime.datetime.fromtimestamp(
                mtime).strftime('%Y-%m-%d')
            cur_date = datetime.datetime.now().strftime('%Y-%m-%d')
            d1 = datetime.date(int(timestamp[:4]), int(
                timestamp[5:7]), int(timestamp[8:]))
            d2 = datetime.date(int(cur_date[:4]), int(
                cur_date[5:7]), int(cur_date[8:]))
            d3 = str(d2-d1)
            d4 = d3.split(",")[0]
            # print(d4[-4:])
            if d4[-4:] == "days":
                if int(d3[:-14]) < 10:
                    if not os.path.exists(os.path.join(path,
                                                       "Less than 10 Days")):
                        os.mkdir(os.path.join(path, "Less than 10 Days"))
                    shutil.move(os.path.join(path, i), os.path.join(
                        path, "Less than 10 Days"))
                elif int(d3[:-14]) < 20:
                    if not os.path.exists(os.path.join(path,
                                                       "Less than 20 Days")):
                        os.mkdir(os.path.join(path, "Less than 20 Days"))
                    shutil.move(os.path.join(path, i), os.path.join(
                        path, "Less than 20 Days"))
                else:
                    if not os.path.exists(os.path.join(path,
                                                       "More than 20 Days")):
                        os.mkdir(os.path.join(path, "More than 20 Days"))
                    shutil.move(os.path.join(path, i), os.path.join(
                        path, "More than 20 Days"))
            else:
                if not os.path.exists(os.path.join(path, "Less than 10 Days")):
                    os.mkdir(os.path.join(path, "Less than 10 Days"))
                shutil.move(os.path.join(path, i), os.path.join(
                    path, "Less than 10 Days"))
        print("done")

# below function converts bytes to their readable size (ex: 1024b=1kb)
    def convert_size(self, size_bytes):
        if size_bytes == 0:
            return "0B"
        size_name = ("B", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB")
        i = int(math.floor(math.log(size_bytes, 1024)))
        p = math.pow(1024, i)
        s = round(size_bytes / p, 2)
        return "%s_%s" % (round(s), size_name[i])

# below function helps user for testing all functionality of this app
# without doing any copy/paste (see demo)
    def resetFile(self, path):
        a = [x for x in os.walk(path)]
        for i in a:
            for b in i[2]:
                p1 = (os.path.join(i[0], b))
                try:
                    shutil.move(p1, path)
                except shutil.Error:
                    pass
                print((p1, path))
        folder = [folder for folder in os.listdir(
            path) if os.path.isfile(os.path.join(path, folder)) is False]
        for i in folder:
            shutil.rmtree(os.path.join(path, i))
        print("done")


if __name__ == "__main__":
    app = QtWidgets.QApplication(sys.argv)
    MainWindow = QtWidgets.QMainWindow()
    ui = Ui_MainWindow()
    ui.setupUi(MainWindow)
    MainWindow.show()
    sys.exit(app.exec_())
