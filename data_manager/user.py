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
    user_data = db_user.add_user(user)
    return user_data
