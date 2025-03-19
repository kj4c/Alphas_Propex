import matplotlib.pyplot as plt
import matplotlib.image as mpimg
import io
import base64


def plot_to_base64(plot):
    # Save the plot to a BytesIO object
    img_buffer = io.BytesIO()
    plot.savefig(img_buffer, format='png')
    img_buffer.seek(0)

    # Convert the image to a base64 string
    img_base64 = base64.b64encode(img_buffer.getvalue()).decode('utf-8')

    return img_base64

def display_base64_image(img_base64):
    img_data = base64.b64decode(img_base64)
    img_buffer = io.BytesIO(img_data)

    img = mpimg.imread(img_buffer, format='png')

    plt.imshow(img) 
    plt.savefig("my_plot.png", format='png', bbox_inches='tight')