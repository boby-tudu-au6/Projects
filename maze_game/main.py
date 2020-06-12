# this programme will work for any size of matrix
# but it should be square matrix
# don't delete maze.py file it's a requirement file for main file
# In this program if no route is found than path finder will move 
# back to starting point, and console will print "no route"
# if route is found than console will print route matrix


from maze import draw,draw_path
import turtle
window = turtle.Screen()
window.setup(500,500)
window.bgcolor("white")
window.title("Maze Solver")

# df = [
#     [1, 0, 0, 0], 
#     [1, 1, 1, 1],
#     [0, 1, 0, 0],
#     [1, 1, 0, 1],
# ]
df=[
    [1,1,0,1,1,0],
    [0,1,1,0,1,0],
    [0,0,1,1,1,0],
    [1,1,1,1,0,1],
    [0,1,0,0,1,0],
    [1,1,1,1,1,1]
]

def findRoute(df):
    end = len(df)-1
    visited=[]
    for i in df:
        visited.append(
            [False] *len(i)
        )
    a,b=0,0
    # route is 2d array having path name
    route=[]
    visited[0][0]=True
    while a!=end or b!=end:          
        if b+1<=end and df[a][b+1]==1 and visited[a][b+1]!="deadend" and visited[a][b+1]!=True:
            b = b+1
            visited[a][b] = True
            route.append("right")
        elif a+1<=end and df[a+1][b]==1 and visited[a+1][b]!="deadend" and visited[a+1][b]!=True:
            a = a+1
            visited[a][b] = True
            route.append("down")
        elif b-1>=0 and df[a][b-1]==1 and visited[a][b-1]!=True and visited[a][b-1]!="deadend":
            b-=1
            visited[a][b]=True
            route.append("left")
        elif a-1>=0 and df[a-1][b]==1 and visited[a-1][b]!=True and visited[a-1][b]!="deadend":
            a-=1
            visited[a][b]=True
            route.append("up")
        else:
            visited[a][b]="deadend"
            if a-1>=0 and visited[a-1][b]==True:
                a-=1
                route.append("up")
            elif a+1<=end and visited[a+1][b]==True:
                a+=1
                route.append("down")
            elif b-1>=0 and visited[a][b-1]==True:
                b-=1
                route.append("left")
            elif b+1<=end and visited[a][b+1]==True:
                b+=1
                route.append("right")
            else:
                print("no route")
                break
            

        
    route_matrix=[]
    for i in visited:
        test=[]
        for k in i:
            if k==True:
                test.append(1)
            else:
                test.append(0)
        route_matrix.append(test)
    # route matrix is array showing 1 as path 0 as wall
    for i in route_matrix:
        print(i)
    draw(df)
    draw_path(route)
            



findRoute(df)

turtle.done()