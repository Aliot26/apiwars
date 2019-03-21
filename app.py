from flask import Flask, render_template, url_for, escape, request, redirect, flash, session, make_response, jsonify
from http import cookies
from data_manager import user as user
from data_manager import vote as vote

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
        return redirect(url_for('route_show_register_form'))

    if user.check_exists(username):
        flash('This username exists already')
        return redirect(url_for('route_show_register_form'))

    if not user.check_passwords_equal(first_password, second_password):
        flash('Passwords must be equal')
        return redirect(url_for('route_show_register_form'))

    if user.registration(username, first_password):
        session['username'] = username
    return redirect('/')


@app.route('/login', methods=['POST'])
def route_login():
    login_user = {
        'username': request.form.get('username'),
        'password': request.form.get('password')
    }
    if user.check_password(login_user):
        session['username'] = login_user['username']
        user_id = user.get_user_id(login_user['username'])

        dict_id_planets = vote.get_planet_id_by_user_id(user_id['id'])
        list_id_planets = vote.get_id_list_from_dict(dict_id_planets)
        string_id_planets = vote.convert_list_to_string(list_id_planets)
        resp = make_response(render_template('index.html'))
        resp.set_cookie('username', session['username'])
        resp.set_cookie('list_id_planets', string_id_planets)

        return resp

    if user.check_exists(login_user['username']):
        flash("Incorrect password")
        return redirect('/')

    flash("User is not in base. Please sign up.")
    return render_template('registration.html')


@app.route('/logout')
def route_logout():
    session.pop('username', None)
    res = make_response(render_template('index.html'))
    res.set_cookie('username', expires=0)
    res.set_cookie('list_id_planets', expires=0)
    return res


@app.route('/vote', methods=["POST"])
def route_vote():
    data_vote = request.json
    user_data = user.get_user(session['username'])

    vote_data = {
        'planet_id': data_vote['planet_id'],
        'planet_name': data_vote['planet_name'],
        'user_id': user_data['id']
    }
    vote.add_vote_data(vote_data)
    return jsonify()


if __name__ == "__main__":
    app.run(
        debug=True
    )
