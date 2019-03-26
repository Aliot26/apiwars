from database_connection import db_vote as db_vote


def add_vote_data(data):
    try:
        return db_vote.add_vote(data)
    except Exception as e:
        print(e)


def get_planet_id_by_user_id(user_id):
    try:
        dict_planets_id = db_vote.get_planet_id_by_user_id(user_id)
        list_planets_id = get_id_list_from_dict(dict_planets_id)
        return convert_list_to_string(list_planets_id)
    except Exception as e:
        print(e)


def get_id_list_from_dict(dict):
    print(dict)
    list_id_planets = []
    for item in dict:
        list_id_planets.append(item['planet_id'])
    return list_id_planets


def convert_list_to_string(list):
    new_string = ':'.join(str(e) for e in list)
    return new_string


def get_recived_votes_planets():
    try:
        return db_vote.get_recived_votes_planets()
    except  Exception as e:
        print(e)