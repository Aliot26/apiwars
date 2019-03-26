import psycopg2

from database_connection import database_connect as db_connect


@db_connect.connection_handler
def get_one_user(cursor, username):
    sql_string = """SELECT id, username, password
                    FROM users
                    WHERE username = %(username)s ;"""
    try:
        cursor.execute(sql_string,
                       {'username': username})
        data = cursor.fetchone()
        return data
    except psycopg2.Error as e:
        print(e)


@db_connect.connection_handler
def get_user_id(cursor, username):
    sql_string = """SELECT id
                    FROM users
                    WHERE username = %(username)s ;"""
    try:
        cursor.execute(sql_string,
                       {'username': username})
        data = cursor.fetchone()
        return data
    except psycopg2.Error as e:
        print(e)


@db_connect.connection_handler
def add_user(cursor, user_data):
    sql_string = """INSERT INTO users ( username, password)
                    VALUES (%(username)s, %(password)s)
                    ON CONFLICT(id) DO NOTHING
                    RETURNING id ;"""
    try:
        cursor.execute(sql_string,
                       {'username': user_data['username'],
                        'password': user_data['password']
                        })
        return id
    except psycopg2.Error as e:
        print(e)
