package com.hoangdexiong01.localization;

import android.app.Activity;
import android.content.Intent;
import android.net.Uri;

import androidx.activity.result.ActivityResult;

import com.getcapacitor.JSObject;
import com.getcapacitor.Plugin;
import com.getcapacitor.PluginCall;
import com.getcapacitor.PluginMethod;
import com.getcapacitor.annotation.ActivityCallback;
import com.getcapacitor.annotation.CapacitorPlugin;

import java.io.OutputStream;
import java.nio.charset.StandardCharsets;

/**
 * Saves a text file through the system "Save as" picker (Storage Access Framework,
 * ACTION_CREATE_DOCUMENT). The picker is built into Android, so it works even when
 * no other app can handle a share intent.
 */
@CapacitorPlugin(name = "FileSaver")
public class FileSaverPlugin extends Plugin {

    @PluginMethod
    public void save(PluginCall call) {
        String name = call.getString("name", "file.txt");
        String data = call.getString("data");
        if (data == null) {
            call.reject("No data");
            return;
        }
        // octet-stream stops Android from appending an extension (e.g. ".xlf.xml") to the name
        Intent intent = new Intent(Intent.ACTION_CREATE_DOCUMENT);
        intent.addCategory(Intent.CATEGORY_OPENABLE);
        intent.setType("application/octet-stream");
        intent.putExtra(Intent.EXTRA_TITLE, name);
        try {
            startActivityForResult(call, intent, "onSaveResult");
        } catch (Exception e) {
            call.reject("No file picker available: " + e.getMessage());
        }
    }

    @ActivityCallback
    private void onSaveResult(PluginCall call, ActivityResult result) {
        if (call == null) return;
        Intent d = result.getData();
        if (result.getResultCode() != Activity.RESULT_OK || d == null || d.getData() == null) {
            JSObject r = new JSObject();
            r.put("cancelled", true);
            call.resolve(r);
            return;
        }
        Uri uri = d.getData();
        try (OutputStream os = getContext().getContentResolver().openOutputStream(uri, "wt")) {
            if (os == null) {
                call.reject("Cannot open the destination file");
                return;
            }
            os.write(call.getString("data", "").getBytes(StandardCharsets.UTF_8));
            os.flush();
            JSObject r = new JSObject();
            r.put("cancelled", false);
            r.put("uri", uri.toString());
            call.resolve(r);
        } catch (Exception e) {
            call.reject("Write failed: " + e.getMessage());
        }
    }
}
