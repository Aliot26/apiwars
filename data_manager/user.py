from database_connection import db_user as db_user
from auth import password_manager as password_manager


def validate(data):
    if not data.isspace():
        return True


def check_data_validate(username, first_password, second_password):
    if validate(username) \
            & validate(first_password) \
            & validate(second_password):
        return True
    else:
        return False


def check_exists(username):
    result = db_user.get_one_user(username)
    if result:
        return True
    else:
        return False


def check_passwords_equal(first_password, second_password):
    if first_password == second_password:
        return True
    else:
        return False


def registration(username, password):
    username = username
    hashed_password = password_manager.hash_password(password)
    user = {
        'username': username,
        'password': hashed_password
    }
    try:
        return db_user.add_user(user)
    except Exception as e:
        print(e)


def get_user(username):
    try:
        return db_user.get_one_user(username)
    except Exception as e:
        print(e)


def check_password(login_user):
    username = login_user['username']
    password_from_form = login_user['password']
    if check_exists(username):
        user_from_base = get_user(username)
        password_from_base = user_from_base['password']
        verify = password_manager.verify_password(password_from_form, password_from_base)
        if verify:
            return True
        return False
