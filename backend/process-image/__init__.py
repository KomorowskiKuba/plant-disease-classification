import json
import requests

import azure.functions as func

tag_disease_map = {
    'virus-disease': {
        'name': 'Viral disease',
        'tip': 'sth1'
    },
    'healthy': {
        'name': 'Healthy',
        'tip': 'sth2'
    },
    'fungal-disease': {
        'name': 'Fungal disease',
        'tip': 'sth3'
    },
    'parasite-disease': {
        'name': 'Parasitic disease',
        'tip': 'sth4'
    },
    'bacterial-disease': {
        'name': 'Bacterial disease',
        'tip': 'sth5'
    },
}

def map_tag_to_disease(name):
    mapping = tag_disease_map[name]
    disease_name = mapping['name']
    disease_tip = mapping['tip']

    return disease_name, disease_tip

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
    print(req)
    print(req.files['image'])
    try:
        image = req.files['image']
        prediction = process_image(image)
        probability = prediction['probability']
        name = prediction['tagName']
        disease_name, disease_tip = map_tag_to_disease(name)

        return func.HttpResponse(
            json.dumps({
                'name': disease_name,
                'probability': probability,
                'tip': disease_tip
            }),
            status_code=200
        )
    except Exception as err:
        return func.HttpResponse(
            'No image parameter provided! Please provide an image parameter.',
            status_code=400
        )