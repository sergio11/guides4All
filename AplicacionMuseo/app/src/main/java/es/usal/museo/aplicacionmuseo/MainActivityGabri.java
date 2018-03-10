package es.usal.museo.aplicacionmuseo;



import android.Manifest;
import android.content.DialogInterface;
import android.content.pm.PackageManager;
import android.graphics.BitmapFactory;
import android.media.AudioManager;
import android.os.Build;
import android.os.RemoteException;
import android.speech.tts.TextToSpeech;
import android.speech.tts.UtteranceProgressListener;
import android.support.v7.app.AlertDialog;
import android.os.Bundle;
import android.util.Log;
import android.view.View;
import android.widget.Button;
import android.widget.ImageView;
import android.widget.Toast;
import android.graphics.Bitmap;


import org.altbeacon.beacon.BeaconParser;
import org.altbeacon.beacon.BeaconConsumer;
import org.altbeacon.beacon.BeaconManager;
import org.altbeacon.beacon.Identifier;
import org.altbeacon.beacon.MonitorNotifier;
import org.altbeacon.beacon.Region;
import org.altbeacon.beacon.startup.RegionBootstrap;

import com.google.android.youtube.player.YouTubeBaseActivity;
import com.google.android.youtube.player.YouTubeInitializationResult;
import com.google.android.youtube.player.YouTubePlayer;
import com.google.android.youtube.player.YouTubePlayer.Provider;
import com.google.android.youtube.player.YouTubePlayerView;


import java.io.ByteArrayOutputStream;
import java.util.HashMap;
import java.util.Locale;

import pl.droidsonroids.gif.GifImageView;

public class MainActivityGabri extends YouTubeBaseActivity implements YouTubePlayer.OnInitializedListener,BeaconConsumer,  TextToSpeech.OnUtteranceCompletedListener {


    protected static final String TAG = "RangingActivity";
    private BeaconManager beaconManager;
    private RegionBootstrap regionBootstrap;

    private static final int PERMISSION_REQUEST_COARSE_LOCATION = 1;

    YouTubePlayerView youTubePlayerView;

    private static YouTubePlayer reproductor;

    BeaconConsumer onBeaconServiceConnect;

    private ImageView gifImageView;


    protected ImageView item;
    protected int imagen=1;
    protected TextToSpeech t1;
    protected String cadena;


    String baliza = null;


    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main_gabri);

        youTubePlayerView = (YouTubePlayerView) findViewById(R.id.youtube_view);
        youTubePlayerView.initialize(AplicacionMuseo.API_YOUTUBE,this);




        beaconManager = BeaconManager.getInstanceForApplication(this.getApplicationContext());
        beaconManager.getBeaconParsers().add(new BeaconParser().setBeaconLayout("m:2-3=0215,i:4-19,i:20-21,i:22-23,p:24-24"));

        beaconManager.bind(this);
        beaconManager.setForegroundBetweenScanPeriod(500l);

        t1=new TextToSpeech(getApplicationContext(), new TextToSpeech.OnInitListener() {
            @Override
            public void onInit(int status) {
                if(status != TextToSpeech.ERROR) {
                    HashMap<String, String> myHashAlarm = new HashMap<String, String>();
                    myHashAlarm.put(TextToSpeech.Engine.KEY_PARAM_STREAM, String.valueOf(AudioManager.STREAM_ALARM));
                    myHashAlarm.put(TextToSpeech.Engine.KEY_PARAM_UTTERANCE_ID, "SOME MESSAGE");

                    Locale spanish = new Locale("es", "ES");
                    t1.setLanguage(spanish);


                    t1.setOnUtteranceProgressListener(new UtteranceProgressListener() {
                        @Override
                        public void onDone(String utteranceId) {
                            Log.d("MainActivity", "TTS finished");


                        }

                        @Override
                        public void onError(String utteranceId) {
                        }

                        @Override
                        public void onStart(String utteranceId) {


                        }
                    });


                } else {
                    Log.e("MainActivity", "Initilization Failed!");
                }

            }

        });


        Button boton_info = (Button) findViewById(R.id.buttonInfo);





        boton_info.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                if (baliza==null){
                    //Decir Frase al inicio
                    if (reproductor!=null)
                    reproductor.pause();
                    t1.speak("Mueve Hacia La Derecha 3 Metros Hasta Oir Indicacion", TextToSpeech.QUEUE_FLUSH, null);
                }else if (baliza == "adios"){
                    reproductor.pause();
                    t1.speak("Muevete en direccion contraría 8 pasos, hasta oir video de catedral", TextToSpeech.QUEUE_FLUSH, null);
                }else if (baliza == "hola"){
                    reproductor.pause();
                    t1.speak("Muevete en direccion contraría 8 pasos, hasta oir video de universidad", TextToSpeech.QUEUE_FLUSH, null);
                }
            }
        });



        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.M) {
            // Android M Permission check
            if (this.checkSelfPermission(Manifest.permission.ACCESS_COARSE_LOCATION) != PackageManager.PERMISSION_GRANTED) {
                final AlertDialog.Builder builder = new AlertDialog.Builder(this);
                builder.setTitle("This app needs location access");
                builder.setMessage("Please grant location access so this app can detect beacons in the background.");
                builder.setPositiveButton(android.R.string.ok, null);
                builder.setOnDismissListener(new DialogInterface.OnDismissListener() {

                    @Override
                    public void onDismiss(DialogInterface dialog) {
                        requestPermissions(new String[]{Manifest.permission.ACCESS_COARSE_LOCATION},
                                PERMISSION_REQUEST_COARSE_LOCATION);
                    }

                });
                builder.show();
            }
        }



    }


    @Override
    public void onBeaconServiceConnect() {
        beaconManager.addMonitorNotifier(new MonitorNotifier() {
            @Override
            public void didEnterRegion(Region region) {
                Log.i(TAG, "ENTRANDO EN ZONA" + region.getUniqueId());
                if (region.getUniqueId().compareTo("hola")==0) {
                    baliza = "hola";
                    if (reproductor != null) {
                        runOnUiThread (new Thread(new Runnable() {
                            public void run() {
                                reproductor.loadVideo("5ozUomSuW7A");
                                reproductor.seekToMillis(43000);
                                Log.i(TAG, "------");
                            }
                        }));

                    }
                }else if (region.getUniqueId().compareTo("adios")==0){
                    baliza = "adios";
                    if (reproductor!=null) {
                        runOnUiThread (new Thread(new Runnable() {
                            public void run() {
                                reproductor.loadVideo("IxlOE-zw41I");
                                Log.i(TAG, "*****");
                            }
                        }));


                    }

                }
            }

            @Override
            public void didExitRegion(Region region) {
                Log.i(TAG, "SALIENDO" + region.getUniqueId());
            }

            @Override
            public void didDetermineStateForRegion(int state, Region region) {
                Log.i(TAG, "I have just switched from seeing/not seeing beacons: "+state);
            }
        });



        try {


            Identifier balizaB = Identifier.parse("19e4915e-239b-11e8-b75e-fc1ed1e5568b");
            Identifier balizaA = Identifier.parse("19e4915e-239b-11e8-b75e-fc1ed1e5568a");


            beaconManager.startMonitoringBeaconsInRegion(new Region("hola", balizaA, null, null));
            beaconManager.startMonitoringBeaconsInRegion(new Region("adios", balizaB, null, null));
            //beaconManager.startRangingBeaconsInRegion(new Region("ostias", null, null, null));
        } catch (RemoteException e) {    }
    }

    @Override
    public void onRequestPermissionsResult(int requestCode,
                                           String permissions[], int[] grantResults) {
        switch (requestCode) {
            case PERMISSION_REQUEST_COARSE_LOCATION: {
                if (grantResults[0] == PackageManager.PERMISSION_GRANTED) {
                    Log.d(TAG, "coarse location permission granted");
                } else {
                    final AlertDialog.Builder builder = new AlertDialog.Builder(this);
                    builder.setTitle("Functionality limited");
                    builder.setMessage("Since location access has not been granted, this app will not be able to discover beacons when in the background.");
                    builder.setPositiveButton(android.R.string.ok, null);
                    builder.setOnDismissListener(new DialogInterface.OnDismissListener() {

                        @Override
                        public void onDismiss(DialogInterface dialog) {
                        }

                    });
                    builder.show();
                }
                return;
            }
        }
    }





    @Override
    public void onInitializationSuccess(Provider provider, YouTubePlayer player, boolean wasRestored) {

        //player.setFullscreen(true);

        reproductor = player;
    }

    @Override
    public void onInitializationFailure(Provider provider, YouTubeInitializationResult errorReason) {

            Toast.makeText(this, "Error", Toast.LENGTH_LONG).show();

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


    @Override
    public void onUtteranceCompleted(String s) {

    }
}
