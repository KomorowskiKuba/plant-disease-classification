import json
import requests

import azure.functions as func

tag_disease_map = {
    'virus-disease': {
        'name': 'Viral disease',
        'tips': [
            'Isolate your diseased plant from rest of your home garden.',
            'Bad news – your plant is most likely to die. You can try searching for specific treatment or plant protection product, but the chances are low.'
        ]
    },
    'healthy': {
        'name': 'Healthy',
        'tips': [
            'Your plant seems nice and healthy, good job!',
            'If you think we are wrong, try to take another picture.'
        ]
    },
    'fungal-disease': {
        'name': 'Fungal disease',
        'tips': [
            'Get rid of attacked leaves or plant-parts.',
            'Give your plant less water.',
            'Ventilate the room more often.',
            'If most of the plant is attacked, you should get rid of it :(',
        ]
    },
    'parasite-disease': {
        'name': 'Parasitic disease',
        'tips': [
            'Treatment strongly depends on type of parasite. To have the best results - locate the parasites on your plant and google search their look to find specific treatment guide.',
            'If you are unable to find exact treatment, you can try mixing water with soap or methylated spirits in a spray bottle and apply it to all foliage.',
            'You can additionally repot your plant, removing all the old soil, but be gentle!'
        ]
    },
    'bacterial-disease': {
        'name': 'Bacterial disease',
        'tips': [
            'Isolate your diseased plant from rest of your home garden.',
            'Bad news – your plant is most likely to die. You can try searching for specific treatment or plant protection product, but the chances are low.'
        ]
    },
}

def map_tag_to_disease(name):
    mapping = tag_disease_map[name]
    disease_name = mapping['name']
    disease_tips = mapping['tips']

    return disease_name, disease_tips

def process_image(image):
    response = requests.post(
        'https://plantdiseaseclassification-prediction.cognitiveservices.azure.com/customvision/v3.0/Prediction/9145edc8-0324-4b1c-8a04-83dbcb8e8b3c/classify/iterations/plant-disease-classifier-iteration-1/image',
        headers={
            'Prediction-Key': 'f0d9d4b8a5584f36a137b6491cf5cf95',
            'Content-Type': 'application/octet-stream'
        },
        data=image
    )
    predictions = response.json()['predictions']

    return predictions[0]

def main(req: func.HttpRequest) -> func.HttpResponse:
    try:
        image = req.files['image']
        prediction = process_image(image)
        probability = prediction['probability']
        name = prediction['tagName']
        disease_name, disease_tips = map_tag_to_disease(name)

        return func.HttpResponse(
            json.dumps({
                'name': disease_name,
                'probability': probability,
                'tips': disease_tips
            }),
            status_code=200
        )
    except Exception as err:
        return func.HttpResponse(
            'No image parameter provided! Please provide an image parameter.',
            status_code=400
        )