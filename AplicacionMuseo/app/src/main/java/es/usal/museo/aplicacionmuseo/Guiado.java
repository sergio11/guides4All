package es.usal.museo.aplicacionmuseo;

import android.content.Intent;
import android.media.AudioManager;
import android.os.Bundle;
import android.speech.tts.TextToSpeech;
import android.speech.tts.UtteranceProgressListener;
import android.support.v7.app.AppCompatActivity;
import android.support.v7.widget.Toolbar;
import android.util.Log;
import android.view.View;
import android.widget.ImageView;

import java.util.HashMap;
import java.util.Locale;

public class Guiado extends AppCompatActivity {

    protected ImageView item;
    protected int imagen=1;
    protected TextToSpeech t1;
    protected String cadena;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_guiado);
        Toolbar toolbar = (Toolbar) findViewById(R.id.toolbar);
        setSupportActionBar(toolbar);

        item = (ImageView) findViewById(R.id.imageView2);
    }



    protected void cambiarImagen(int imagen)
    {
        //izquierda
        if(imagen==1)
        {
            item.setImageResource(R.mipmap.p_izquierda);
            cadena="izquierda";
        }
        //arriba
        else if(imagen==2)
        {
            item.setImageResource(R.mipmap.p_arriba);
            cadena="recto";
        }
        else if(imagen==3)
        {
            item.setImageResource(R.mipmap.p_derecha);
            cadena="derecha";
        }
        else
        {
            item.setImageResource(R.mipmap.p_abajo);
            cadena="retroceda";
        }


        t1=new TextToSpeech(getApplicationContext(), new TextToSpeech.OnInitListener() {
            @Override
            public void onInit(int status) {
                if (status != TextToSpeech.ERROR) {


                    Locale spanish = new Locale("es", "ES");
                    t1.setLanguage(spanish);
                    t1.speak(cadena, TextToSpeech.QUEUE_FLUSH, null);

                }
            }

            });
    }

    public void onClickBoton1(View v) {
        imagen++;

        if(imagen>4)
            imagen=1;

        cambiarImagen(imagen);
    }


}
