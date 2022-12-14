import keras
from PIL import Image, ImageOps
import matplotlib.image as img
import pylab as plt
import numpy as np
import os
from pathlib import Path
from io import BytesIO
import base64

class NORMAL_CNN:
    
    def plot_img_graph(self):
    
        buffer = BytesIO()
        plt.savefig(buffer, format="png", dpi = 300) 
        graph = base64.b64encode(buffer.getvalue()).decode("utf-8").replace("\n", "")
        buffer.close()

        return graph

    def bigElement(self, elem):
    
        BIG_ELEM = elem[0]

        for i in elem:
            if i > BIG_ELEM:
                BIG_ELEM = i

        ELEM_POS = elem.index(BIG_ELEM)

        return ELEM_POS

    def process_img(self):
        np.set_printoptions(suppress=True)
        model = keras.models.load_model(os.path.dirname(__file__) + '/Normal_cnn_Models/keras_model.h5')
        IMAGE_DUMPS =os.listdir(os.path.join(Path(__file__).resolve().parent,  f'dumps'))
        PLOT_IMAGES = []
        tick_label = ['DO BIR', 'MILD', 'MODERATE', 'SEVER', 'BLINDNESS']

       
        # *** PREAPRE THE IMAGE INTO AN ARRAY ***
        data = []
        for im in IMAGE_DUMPS:
            image = Image.open(os.path.join(Path(__file__).resolve().parent,  f'dumps\\{im}'))
            size = (224, 224)
            image = ImageOps.fit(image, size, Image.ANTIALIAS)
            image_array = np.asarray(image)
            normalized_image_array = (image_array.astype(np.float32) / 127.0) - 1
            data.append(normalized_image_array)

        # *** PREDICT THE IMAGE 
        data = np.array(data, np.float32)
        prediction = model.predict(data)
        ELEM_POSITIONS = []

        for i in  prediction:
            x = [round(m,2)*100 for m in i]
            elem_pos =  self.bigElement(x)
            ELEM_POSITIONS.append(elem_pos)
            

        prediction_pos = 0

        for im in IMAGE_DUMPS:
            eye_  = np.uint8(img.imread(os.path.join(Path(__file__).resolve().parent,  f'dumps\\{im}')))
            FIGURE = plt.figure(figsize=(10, 10))
            FIGURE.add_subplot(221)
            plt.title(im)
            plt.imshow(eye_)

            FIGURE.add_subplot(222)
            plt.title("Results")
            plt.bar([0,1,2,3,4],[round(x,2)*100 for x in prediction[prediction_pos]],tick_label = tick_label, width=1)
            plt.hist(prediction[prediction_pos])

            graph_img = self.plot_img_graph()

            PLOT_IMAGES.append(graph_img)

            prediction_pos = prediction_pos + 1

        return ELEM_POSITIONS, PLOT_IMAGES