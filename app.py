from flask import Flask, render_template, url_for, escape, request, redirect, flash, session, make_response, jsonify
from data_manager import user as user
from data_manager import vote as vote

app = Flask(__name__)
app.secret_key = "waw"


@app.route('/')
def route_index():
    return render_template('index.html')


@app.route('/register', methods=["POST"])
def route_registration():
    data_register = request.get_json()
    login_user = {
        'username': data_register['username'],
        'password': data_register['password']
    }

    if not user.check_exists(login_user['username']):
        user.registration(login_user['username'], login_user['password'])
        make_response(redirect('/'))
        return jsonify(
            {'success': 'Registration successful!', 'username': login_user['username']})
    else:
        return jsonify({'error': 'Wrong username or password!'})


@app.route('/login', methods=['POST'])
def route_login():
    data_login = request.get_json()
    login_user = {
        'username': data_login['username'],
        'password': data_login['password']
    }

    if user.check_password(login_user):
        user_id = user.get_user_id(login_user['username'])
        string_id_planets = vote.get_planet_id_by_user_id(user_id['id'])
        make_response(redirect('/'))
        return jsonify(
            {'success': 'Login successful!', 'username': login_user['username'], 'id_planets': string_id_planets})
    else:
        return jsonify({'error': 'Wrong username or password!'})


# @app.route('/logout')
# def route_logout():
#     res = make_response(redirect('/'))
#     return res


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


@app.route('/statistics')
def route_statistics():
    data_votes = vote.get_recived_votes_planets()
    return jsonify(data_votes)


if __name__ == "__main__":
    app.run(
        debug=True
    )
