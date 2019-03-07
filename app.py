from flask import Flask, render_template, url_for, escape, request, redirect, flash

from data_manager import user as user

app = Flask(__name__)
app.secret_key = "waw"

@app.route('/')
def index():
    return render_template('index.html')


@app.route('/registration')
def show_register_form():
    return render_template('registration.html', form_url='/registration')


@app.route('/registration', methods=["POST"])
def registration():
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

    user_data = user.registration(username, first_password)

    return render_template('index.html')


if __name__ == "__main__":
    app.run(
        debug=True
    )
