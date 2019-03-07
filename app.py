from flask import Flask, render_template, url_for, escape, request, redirect, flash, session

from data_manager import user as user

app = Flask(__name__)
app.secret_key = "waw"


@app.route('/')
def route_index():
    return render_template('index.html')


@app.route('/registration')
def route_show_register_form():
    return render_template('registration.html', form_url='/registration')


@app.route('/registration', methods=["POST"])
def route_registration():
    username = escape(request.form.get('username'))
    first_password = escape(request.form.get('password1'))
    second_password = escape(request.form.get('password2'))

    if not user.check_data_validate(username, first_password, second_password):
        flash('Please provide all data')
        return redirect(url_for('show_register_form'))

    if user.check_exists(username):
        flash('This username exists already')
        return redirect(url_for('show_register_form'))

    if not user.check_passwords_equal(first_password, second_password):
        flash('Passwords must be equal')
        return redirect(url_for('show_register_form'))

    if user.registration(username, first_password):
        session['username'] = username

    return render_template('index.html', username=username)


@app.route('/login', methods=['POST'])
def route_login():
    login_user = {
        'username': request.form.get('username'),
        'password': request.form.get('password')
    }
    if user.check_password(login_user):
        session['username'] = login_user['username']
        return redirect('/')

    if user.check_exists(login_user['username']):
        flash("Incorrect password")
        return redirect('/')

    flash("User is not in base. Please sign up.")
    return render_template('registration.html')


@app.route('/logout')
def route_logout():
    del session['username']
    return redirect('/')


if __name__ == "__main__":
    app.run(
        debug=True
    )
