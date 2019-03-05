from flask import Flask, render_template, url_for

app = Flask(__name__)

@app.route('/')
def route_index():
    table_header = ['Name', 'Diameter', ]
    return render_template('index.html')

if __name__ == "__main__":
    app.run(
        debug=True
    )
