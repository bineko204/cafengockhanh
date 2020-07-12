<?php


 // *** Include the class
    include("class_resize_image.php");

function uploadImage($imageObj)
{   
    $error = [];
    if (!empty($imageObj["name"])) {
       
        if (
            $imageObj["type"] == "image/jpeg"
            || $imageObj["type"] == "image/png"
            || $imageObj["type"] == "image/gif"
        ) {
            $path = "../image/"; // file luu vào thu muc chua file upload
            $tmp_name = $imageObj['tmp_name'];
            $filename = pathinfo($imageObj['name'], PATHINFO_FILENAME) ;
            $extension = ".".pathinfo($imageObj['name'], PATHINFO_EXTENSION) ;
            
            $type = $imageObj['type'];
            $size = $imageObj['size'];
            if ($size > 8048576) {
                $error['size'] = "file Quá nặng";
            }

            // kiem tra su ton tai cua file
            if(file_exists($path.$filename.$extension)){
                $count = 0;
                $tempfilename = $filename."[".$count."]";
                while(file_exists($path.$tempfilename.$extension)){
                    $count ++;
                    $tempfilename = $filename."[".$count."]";
                }
                $filename = $tempfilename;
            }
            $img_name = $filename.$extension;
            if(empty($error))
            {
                // Upload file
                move_uploaded_file($tmp_name, $path . $img_name);
                $image_url = $path . $img_name;
                $image_thumb_url = $path."thumb/".$filename."-thumb".$extension;
                $result = [ "name" => $img_name ,"image" => $image_url, "thumb" => $image_thumb_url, "size" => $size];

                     // *** 1) Initialise / load image
                    $resizeObj = new resize($image_url);

                    // *** 2) Resize image (options: exact, portrait, landscape, auto, crop)
                    $resizeObj -> resizeImage(200, 200, 'auto');

                    // *** 3) Save image
                    $resizeObj -> saveImage($image_thumb_url, 100);

                
                return $result;
            }
        } else {
            $error['invalid_file'] = "File không hợp lệ";
        }
    } 
}