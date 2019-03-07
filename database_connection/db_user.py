import psycopg2

from database_connection import database_connect as db_connect


@db_connect.connection_handler
def get_one_user(cursor, username):
    try:
        cursor.execute("""
                        SELECT id, username, password
                        FROM users
                        WHERE username = %(username)s ;
                                   """,
                       {'username': username})
        data = cursor.fetchone()
        return data
    except psycopg2.Error as e:
        print(e)


@db_connect.connection_handler
def add_user(cursor, user_data):
    try:
        cursor.execute("""
                        INSERT INTO users ( username, password)
                        VALUES (%(username)s, %(password)s)
                        ON CONFLICT(id) DO NOTHING
                        RETURNING id ;
                                   """,
                       {'username': user_data['username'],
                        'password': user_data['password']
                        })
    except psycopg2.Error as e:
        print(e)
