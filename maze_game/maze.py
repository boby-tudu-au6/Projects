import turtle
window = turtle.Screen()
window.setup(500,500)
window.bgcolor("white")
window.title("Maze Solver")
pen = turtle.Turtle()
pen.penup()
pen.setx(-80)
pen.sety(80)
pen.pendown()
pen.speed(100)
def square(color):
    pen.fillcolor(color)
    pen.begin_fill()
    for _ in range(4):
        pen.forward(40)
        pen.right(90)
    pen.end_fill()

def draw(df):
    for i in df:
        for a in i:
            if a==1:
                square('white')
            else:
                square('black')
            pen.penup()
            pen.setx(int(pen.pos()[0])+45)
            pen.pendown()
        pen.penup()
        pen.setx(int(pen.pos()[0])-(44.5*(len(df))))
        pen.sety(int(pen.pos()[1])-45)
        pen.pendown()

def draw_path(df):
    pen2 = turtle.Turtle()
    pen2.penup()
    pen2.speed(1)
    pen2.setx(0-60)
    pen2.sety(0+60)
    pen2.pensize(20)
    pen2.pendown()
    pen2.pencolor("red")
    for i in df:
        if i=="down":
            pen2.right(90)
            pen2.forward(45)
            pen2.left(90)
        elif i=="right":
            pen2.forward(45)
        elif i=="left":
            pen2.forward(-45)
        elif i=="up":
            pen2.left(90)
            pen2.forward(45)
            pen2.right(90)


            
