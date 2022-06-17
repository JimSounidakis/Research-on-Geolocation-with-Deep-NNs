# -*- coding: utf-8 -*-
"""
Created on Thu Jan 16 17:13:36 2020

@author: Jim
"""


import cv2
import os
import glob

path = "C:/PATH/TO/IMAGES/FOLDER"


def loadImages(path):
    return [os.path.join(path, f) for f in os.listdir(path) if f.endswith('.jpg')]

filenames = loadImages(path)


imgs = []
for file in filenames:
    imgs.append(cv2.imread(file, cv2.IMREAD_UNCHANGED))


orig_files = [ofile for ofile in glob.glob(path+"/*.jpg")]
names_ext = [os.path.join(path, os.path.basename(f)) for f in orig_files]
names = [os.path.splitext(f)[0] for f in names_ext]



"""
ROTATION FOR THE ORIGINAL IMAGES(90, 180, 270 DEGREES)
"""
"""
for img, name in zip(imgs, names):

    (h, w) = img.shape[:2]
    center = (w/2, h/2)
    angle90 = 360-90
    scale = 1.0

    a = cv2.getRotationMatrix2D(center, angle90, scale)
    rotated90 = cv2.warpAffine(img, a, (h, w))

    cv2.imwrite(name + "_r090" + ".jpg", rotated90)


for img, name in zip(imgs, names):

    (h, w) = img.shape[:2]
    center = (w/2, h/2)
    angle180 = 360-180
    scale = 1.0

    b = cv2.getRotationMatrix2D(center, angle180, scale)
    rotated180 = cv2.warpAffine(img, b, (w, h))

    cv2.imwrite(name + "_r180" + ".jpg", rotated180)


for img, name in zip(imgs, names):

    (h, w) = img.shape[:2]
    center = (w/2, h/2)
    angle270 = 360-270
    scale = 1.0

    c = cv2.getRotationMatrix2D(center, angle270, scale)
    rotated270 = cv2.warpAffine(img, c, (h, w))

    cv2.imwrite(name + "_r270" + ".jpg", rotated270)
"""



"""
CROP FOR 0, 90 DEGREES (BLUE, YELLOW, GREEN, RED, PURPLE)
"""
"""
h = 300
w = 300
for img, name in zip(imgs, names):
    y = 120
    x = 120
    crop_blue = img[y:y+h, x:x+w]
    cv2.imwrite(name + "_c1.jpg", crop_blue)

for img, name in zip(imgs, names):
    y = 170
    x = 170
    crop_yellow = img[y:y+h, x:x+w]
    cv2.imwrite(name + "_c2.jpg", crop_yellow)

for img, name in zip(imgs, names):
    y = 220
    x = 220
    crop_green = img[y:y+h, x:x+w]
    cv2.imwrite(name + "_c3.jpg", crop_green)


for img, name in zip(imgs, names):
    y = 120
    x = 220
    crop_red = img[y:y+h, x:x+w]
    cv2.imwrite(name + "_c4.jpg", crop_red)


for img, name in zip(imgs, names):
    y = 220
    x = 120
    crop_purple = img[y:y+h, x:x+w]
    cv2.imwrite(name + "_c5.jpg", crop_purple)
"""



"""
CROP FOR 180, 270 DEGREES(BLUE, YELLOW, GREEN, RED, PURPLE)
"""
"""
h = 300
w = 300
for img, name in zip(imgs, names):
    y = 90
    x = 90
    crop_blue = img[y:y+h, x:x+w]
    cv2.imwrite(name + "_c1.jpg", crop_blue)

for img, name in zip(imgs, names):
    y = 170
    x = 170
    crop_yellow = img[y:y+h, x:x+w]
    cv2.imwrite(name + "_c2.jpg", crop_yellow)

for img, name in zip(imgs, names):
    y = 250
    x = 250
    crop_green = img[y:y+h, x:x+w]
    cv2.imwrite(name + "_c3.jpg", crop_green)


for img, name in zip(imgs, names):
    y = 90
    x = 250
    crop_red = img[y:y+h, x:x+w]
    cv2.imwrite(name + "_c4.jpg", crop_red)


for img, name in zip(imgs, names):
    y = 250
    x = 90
    crop_purple = img[y:y+h, x:x+w]
    cv2.imwrite(name + "_c5.jpg", crop_purple)
"""



"""
CROP FOR 300X320
"""
"""
h = 532
w = 512
for img, name in zip(imgs, names):
    x = 0
    y = 0-20
    original_images = img[0:512, 0:512]
    cropped_zero = img[0:512, 0:512]
    cv2.imwrite(name + "_c.jpg", cropped_zero)
"""
