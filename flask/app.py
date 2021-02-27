from flask import Flask
from flask import request
from flaskext.mysql import MySQL

app = Flask(__name__)

mysql = MySQL()
app.config['MYSQL_DATABASE_USER'] = 'root'
app.config['MYSQL_DATABASE_PASSWORD'] = 'Shubham@1994'
app.config['MYSQL_DATABASE_DB'] = 'products'
app.config['MYSQL_DATABASE_HOST'] = 'localhost'
mysql.init_app(app)
conn = mysql.connect()
cursor =conn.cursor()

# 
# home routes
# 
@app.route("/api/v1/home/imageCarousal")
def imageCarousal():
    cursor.execute("select image from imageCarousal")
    data = cursor.fetchall()
    return {"data":data}

@app.route("/api/v1/home/category")
def category():
    cursor.execute("select * from category")
    data = cursor.fetchall()
    print(data)
    return {"data":data}

@app.route("/api/v1/home/offer")
def offer():
    cursor.execute("select * from product where tag='offer'")
    data = cursor.fetchall()
    return {"data":data}

# 
# category routes
# 
@app.route("/api/v1/category/getProduct")
def categoryOne():
    page = request.args.get('page')
    return page

@app.route("/api/v1/category/getAllProducts")
def categoryGetProduct():
    page = request.args.get('page')
    return page

if __name__ == '__main__':
    app.run(debug=True)