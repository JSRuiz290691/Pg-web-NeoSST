import os
import rembg
from PIL import Image

def main():
    base_dir = "Imagenes"
    profile_img_path = os.path.join(base_dir, "johan_profile.png")
    
    print("Removing background from profile...")
    try:
        with open(profile_img_path, "rb") as f:
            input_data = f.read()
    except Exception as e:
        print(f"Could not read {profile_img_path}: {e}")
        return

    output_data = rembg.remove(input_data)
    
    temp_nobg = "temp_nobg.png"
    with open(temp_nobg, "wb") as f:
        f.write(output_data)
        
    profile_nobg = Image.open(temp_nobg).convert("RGBA")
    
    # Crop to bounding box of the non-transparent pixels
    bbox = profile_nobg.getbbox()
    if bbox:
        profile_nobg = profile_nobg.crop(bbox)
        
    categories = [
        "sgsst_implementacion.png",
        "sgsst_administracion.png",
        "sgsst_auditoria.png",
        "sgsst_asesoria.png",
        "tar_alturas.png",
        "tar_electrica.png",
        "tar_loto.png",
        "tar_calderas.png",
        "med_evaluaciones.png",
        "med_sistemas.png",
        "med_asesoria.png",
        "leg_matriz.png",
        "leg_investigacion.png",
        "leg_capacitacion.png",
        "leg_ambiental.png"
    ]
    
    print("Processing 15 images...")
    for filename in categories:
        filepath = os.path.join(base_dir, filename)
        if not os.path.exists(filepath):
            print(f"Skipping {filename}, not found.")
            continue
            
        print(f"Compositing {filename}...")
        try:
            bg_img = Image.open(filepath).convert("RGBA")
            bg_w, bg_h = bg_img.size
            
            # The profile will be 60% of the height of the background image
            # and placed at the bottom right.
            target_h = int(bg_h * 0.60)
            aspect_ratio = profile_nobg.width / profile_nobg.height
            target_w = int(target_h * aspect_ratio)
            
            resized_profile = profile_nobg.resize((target_w, target_h), Image.LANCZOS)
            
            # Position: bottom right
            x = bg_w - target_w - 20 # 20px padding from right
            y = bg_h - target_h
            
            # Paste the profile using its own alpha as the mask
            out_img = bg_img.copy()
            out_img.paste(resized_profile, (x, y), resized_profile)
            
            # Save as PNG
            out_img.save(filepath)
            
        except Exception as e:
            print(f"Error processing {filename}: {e}")
            
    print("Done")

if __name__ == "__main__":
    main()
