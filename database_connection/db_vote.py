import psycopg2

from database_connection import database_connect as db_connect


@db_connect.connection_handler
def add_vote(cursor, data):
    try:
        cursor.execute("""
                        INSERT INTO planet_votes ( planet_id, planet_name, user_id, submission_time)
                        VALUES (%(planet_id)s, %(planet_name)s, %(user_id)s, NOW()::timestamp(0))
                        ON CONFLICT(id) DO NOTHING
                        RETURNING id ;
                                   """,
                       {'planet_id': data['planet_id'],
                        'planet_name': data['planet_name'],
                        'user_id': data['user_id']
                        })
        return id
    except psycopg2.Error as e:
        print(e)


@db_connect.connection_handler
def get_planet_id_by_user_id(cursor, user_id):
    try:
        cursor.execute("""
                        SELECT planet_id
                        FROM planet_votes
                        WHERE user_id = %(user_id)s ;
                                   """,
                       {'user_id': user_id})
        data = cursor.fetchall()
        return data
    except psycopg2.Error as e:
        print(e)
