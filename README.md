# Research-on-Geolocation-with-Deep-NNs

This research tackles the subject of geolocation with the help of deep neural networks. More specifically, the geolocation was concerned on fuel depots that were existed 
in highways and local roads. Famous applications about geolocation, like Google Maps, does not have the ability of making a specific marker on fuel depots on a specific 
address, for example 8th km of Larissa - Volos Highway. Additionally, they return the geographic middle point of the address, if they understand it, or nothing at all, 
which is the most common situation.

The mechanism that was developed uses Google Directions API so as to find the address that we are looking for, follows algorithmically that address until the given 
kilometer and then analyzes the satellite images of the area to find whether or not there is a fuel depot. These satellite images are produced by Google Maps API while 
the geolocation is performed with the deep neural network which was trained for that specific reason.

The neural network that was used is the architecture of Faster R-CNN and it was trained with satellite images that was returned by the use of Google Maps API and by data 
that was provided by the developers of the FuelGR application. Faster R-CNN was created with the use of TensorFlow framework and also with the use of Keras library in 
Python.

The end results were great while the mechanism achieved very high precision, recall and accuracy.
